import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { IncrementItems, DecrementItems, ClearCart } from "../Store/CardSlicer";
import axiosClient from "../axiosClient/axiosClient";
import SuccessComponent from "../Components/CheckoutPageComponents/OrderSuccessComponent";

export default function CheckoutPage() {
  useEffect(() => {
    document.title = "Your Cart | Tastify";
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addressTitle, setAddressTitle] = useState("")
  const [addressDetail, setAddressDetail] = useState("")
  const [addingAddress, setAddingAddress] = useState(false)
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [dummyAddresses, setDummyAddresses] = useState([])
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [])
  const items = useSelector((state) => state.cartslice.items);
  const addAddress = async (data) => {
    try {
      const address = await axiosClient.post('/detail/addAddress', data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const addressList = await axiosClient.get('/detail/getAddress')
        setDummyAddresses(addressList.data.addressList || [])
      } catch (error) {
        console.log(error)
      }
    }
    fetchAddress()
  }, [user])
  console.log("address are :", dummyAddresses)
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    if (dummyAddresses.length > 0) {
      setSelectedAddress(dummyAddresses[0]._id);
    }
  }, [dummyAddresses]);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Success state
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  function handleIncrementItems(restData) {
    if (!isAuthenticated) navigate("/login");
    dispatch(IncrementItems(restData));
  }
  function handleDecrementItems(restData) {
    if (!isAuthenticated) navigate("/login");
    dispatch(DecrementItems(restData));
  }

  const subtotal = items.reduce((acc, i) => acc + (i.price / 100) * i.quantity, 0);
  let deliveryFee = 49;
  if (items.length == 0) deliveryFee = 0;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + taxes;

  // Razorpay loader
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const onlinePayment = async (price) => {
    try {
      const response = await axiosClient.post("/payment/createOrder", {
        totalAmount: price,
      });
      const data = response.data;

      const paymentObject = new window.Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        order_id: data.id,
        handler: async function (response) {
          try {
            const verifyRes = await axiosClient.post("/payment/verifyPayment", {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              orderData:{
                      items,
                      selectedAddress,
                      paymentMethod,
                      total,
                      userId: user.user._id,
              }
            });

            if (verifyRes.data.success) {
              dispatch(ClearCart());
              setOrderDetails({
                items,
                address: dummyAddresses.find((a) => a._id === selectedAddress),
                paymentMethod,
                total,
              });
              setOrderSuccess(true);
            } else {
              alert("Payment failed");
            }
          } catch (err) {
            console.log(err);
          }
        },
      });
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const codPayment = async (data) => {
    try {
      const response = await axiosClient.post("/payment/cod", data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-12 md:pt-15 pb-8 md:pb-12 px-4 relative">
      {/* ✅ Checkout Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {/* Left: Cart Items */}
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Your Cart</h2>
          <div className="overflow-y-auto flex-col max-h-[400px] md:max-h-[500px]">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-2 md:p-3 rounded-xl md:rounded-2xl shadow-md gap-2"
              >
                <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                  <img
                    draggable="false"
                    className="h-16 w-16 md:h-20 md:w-20 object-cover rounded-lg md:rounded-xl flex-shrink-0"
                    src={
                      "https://media-assets.swiggy.com/swiggy/image/upload/" +
                      item?.imageId
                    }
                    alt={item.name}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm md:text-lg text-gray-800 truncate">
                      {item.name}
                    </p>
                    <p className="font-bold text-sm md:text-base text-gray-700">₹{item.price / 100}</p>
                  </div>
                </div>
                <div className="flex items-center border rounded-lg md:rounded-xl overflow-hidden flex-shrink-0">
                  <button
                    onClick={() => handleDecrementItems(item)}
                    className="px-2 md:px-3 py-1 text-base md:text-lg bg-gray-100 hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="px-2 md:px-4 py-1 text-base md:text-lg">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrementItems(item)}
                    className="px-2 md:px-3 py-1 text-base md:text-lg bg-gray-100 hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Checkout Summary */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 space-y-4 lg:sticky lg:top-28">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Checkout</h2>

          {/* Address */}
          <div>
            <p className="font-semibold text-sm md:text-base text-gray-800 mb-2">Delivery Address</p>
            <div className="flex flex-col overflow-y-auto max-h-40 md:max-h-45">
              {dummyAddresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => setSelectedAddress(addr._id)}
                  className={`border p-3 rounded-xl mb-2 cursor-pointer ${selectedAddress === addr._id
                    ? "border-[#ff5200] bg-orange-50"
                    : "border-gray-300"
                    }`}
                >
                  <p className="font-medium text-gray-700">{addr.title}</p>
                  <p className="text-gray-600 text-sm">{addr.address}</p>
                </div>
              ))}




            </div>
            {/* Button to open form */}
            {!addingAddress && (
              <div className=" flex justify-end">
                <button
                  onClick={() => setAddingAddress(true)}
                  className="mt-4 bg-orange-500 text-white px-3 py-2 font-medium text-xs md:text-sm rounded-lg hover:bg-orange-600"
                >
                  Add Address
                </button> 
              </div>
            )}
          </div>
          {/* Add Address Form */}
          {addingAddress && (
            <div className="mt-4 space-y-2">
              <input
                type="text"
                placeholder="Title (e.g. Home, Office)"
                value={addressTitle}
                onChange={(e) => setAddressTitle(e.target.value)}
                className="w-full border rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Address details"
                value={addressDetail}
                onChange={(e) => setAddressDetail(e.target.value)}
                className="w-full border rounded-lg p-2"
              />
              <div className="flex justify-end gap-1.5">
                <button
                  onClick={async () => {
                    await addAddress({
                      newAddress: { title: addressTitle, address: addressDetail },
                    });
                    setAddressTitle("");
                    setAddressDetail("");
                    setAddingAddress(false);
                    // refresh address list
                    const list = await axiosClient.get("/detail/getAddress");
                    setDummyAddresses(list.data.addressList || []);
                  }}
                  className="bg-orange-500 font-body text-white px-4 cursor-pointer py-2 rounded-lg hover:bg-orange-600"
                >
                  Save Address
                </button>
                <button onClick={()=> setAddingAddress(false)} className="bg-gray-300 border-slate-300 border-2 font-heading  text-slate-800 px-2 py-1 rounded-lg cursor-pointer hover:bg-gray-200">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Payment */}
          <div>
            <p className="font-semibold text-sm md:text-base text-gray-800 mb-2">Payment Method</p>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <label
                className={`flex-1 flex items-center gap-2 p-2 border rounded-xl cursor-pointer ${paymentMethod === "cod"
                  ? "border-[#ff5200] bg-orange-50"
                  : "border-gray-300"
                  }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-[#ff5200] w-4 h-4"
                />
                <span className="text-gray-700 font-medium text-sm">
                  Cash on Delivery
                </span>
              </label>
              <label
                className={`flex-1 flex items-center gap-2 p-2 border rounded-xl cursor-pointer ${paymentMethod === "online"
                  ? "border-[#ff5200] bg-orange-50"
                  : "border-gray-300"
                  }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-[#ff5200] w-4 h-4"
                />
                <span className="text-gray-700 font-medium text-sm">
                  Online Payment
                </span>
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-gray-600 mb-1">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-1">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Taxes</span>
              <span>₹{taxes}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={async () => {
                if (items.length === 0) {
                  alert("Your cart is empty. Please add items before placing an order.");
                  return;
                }
                if (selectedAddress == null) {
                  setAddingAddress(true);
                  return;
                }
                if (paymentMethod === "cod") {
                  try {
                    const res = await codPayment({
                      items,
                      selectedAddress,
                      paymentMethod,
                      total,
                      userId: user.user._id,
                    });

                    if (res.data?.success) { // check server response
                      dispatch(ClearCart());
                      setOrderDetails({
                        items,
                        address: dummyAddresses.find((a) => a._id === selectedAddress),
                        paymentMethod,
                        total,
                        orderId: res.data?.orderId || "N/A",
                      });
                      setOrderSuccess(true);
                    } else {
                      alert("Payment failed. Please try again.");
                      setOrderSuccess(false);
                    }

                  } catch (err) {
                    console.log("Error occurred in COD payment:", err);
                    alert("Something went wrong. Please try again.");
                    setOrderSuccess(false);
                  }
                } else {
                  await onlinePayment(total);
                }

              }}
              className="w-full mt-4 bg-[#ff5200] text-white py-2 md:py-3 rounded-xl font-bold text-sm md:text-base shadow-md hover:bg-orange-600 transition"
            >
              Place Order →
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Success Overlay */}
      {orderSuccess && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
          <SuccessComponent order={orderDetails} onClose={() => setOrderSuccess(false)} />
        </div>
      )}
    </div>
  );
}
