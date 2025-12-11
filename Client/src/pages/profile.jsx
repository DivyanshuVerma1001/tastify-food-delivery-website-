import React, { use, useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Edit2, LogOut, List, Home, Calendar, CreditCard, Utensils, Gift,IndianRupee, Menu, X } from "lucide-react";
import axiosClient from "../axiosClient/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../Store/authSlice"
import { toast } from "react-toastify";
export default function ProfilePage() {
  // Checkout.jsx
useEffect(() => {
  document.title = "Profile | Tastify";
}, []);

const [sidebarOpen, setSidebarOpen] = useState(false);


  const [addressTitle, setAddressTitle] = useState("")
  const [addressDetail, setAddressDetail] = useState("")
  const [addressList, setAddressList] = useState([])
  const [addingAddress, setAddingAddress] = useState(false)
  const [activeTab, setActiveTab] = useState("profile");
  const [orderList, setOrderList] = useState([]);
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    try {
      const reply = await dispatch(logoutUser());
      if (reply.type === "auth/logout/fulfilled") {
        const successMessage = reply.payload?.message || "Logged out successfully!";
        toast.success(successMessage);
      } else if (reply.type === "auth/logout/rejected") {
        const errorMessage = reply.payload || "Logout failed. Please try again.";
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const { isAuthenticated, loading, user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [])
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const list = await axiosClient.get("/detail/orders", {
          params: { userId: user?.user?._id }, // safer: user id as query param
        });
        setOrderList(list.data.orders || []);
        console.log("orderlist:",list.data)
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const list = await axiosClient.get("/detail/getAddress");
        console.log("list", list)
        setAddressList(list.data.addressList || []);
      } catch (err) {
        console.error("Error fetching Address", err);
      }
    };

    if (user) fetchAddresses();
    console.log("address List", addressList)
  }, [user]);

  const addAddress = async (data) => {
    try {
      const address = await axiosClient.post('/detail/addAddress', data)
    } catch (error) {
      console.log(error)
    }
  }
  // console.log("address list", addressList)
  const [userInfo,setUserInfo]=useState({
    name: "N/A",
    email: "N/A",
    phone: "N/A",
    address: "Delhi, India",
    dob: "N/A",
    gender: "N/A",
    payment: "UPI - Google Pay",
    cuisine: "North Indian, Chinese",
    points: 240,
    membership: "Gold Member",
  })

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const list = await axiosClient.get("/detail/getUserInfo");
        console.log("info list", list)
        const detail=list.data.userInfo || {};
        userInfo.name= detail.name;
        userInfo.email=detail.email;
        userInfo.phone= detail.number;
        setUserInfo(userInfo)
      } catch (err) {
        console.error("Error fetching userDetail", err);
      }
    };

    if (user) fetchUserInfo();
   
  }, [user]);


  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Mobile Menu Button */}
      <div className="md:hidden bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-50">
        <h2 className="text-lg font-bold">My Account</h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:sticky top-0 left-0 h-full md:h-screen w-64 bg-white shadow-lg p-4 md:p-6 border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out overflow-y-auto`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg md:text-xl font-bold hidden md:block">My Account</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
        <ul className="space-y-2 md:space-y-4 text-gray-700">
          <li
            className={`flex items-center gap-3 text-sm md:text-[18px] hover:bg-slate-100 p-2 rounded-lg cursor-pointer hover:text-orange-600 transition-colors ${activeTab === "profile" ? "text-orange-600 font-semibold bg-orange-50" : ""
              }`}
            onClick={() => {
              setActiveTab("profile");
              setSidebarOpen(false);
            }}
          >
            <User size={18} className="md:w-5 md:h-5" /> Profile
          </li>
          <li
            className={`flex items-center gap-3 text-sm md:text-[18px] hover:bg-slate-100 p-2 rounded-lg cursor-pointer hover:text-orange-600 transition-colors ${activeTab === "orders" ? "text-orange-600 font-semibold bg-orange-50" : ""
              }`}
            onClick={() => {
              setActiveTab("orders");
              setSidebarOpen(false);
            }}
          >
            <List size={18} className="md:w-5 md:h-5" /> Orders
          </li>
          <li
            className={`flex items-center gap-3 text-sm md:text-[18px] hover:bg-slate-100 p-2 rounded-lg cursor-pointer hover:text-orange-600 transition-colors ${activeTab === "address" ? "text-orange-600 font-semibold bg-orange-50" : ""
              }`}
            onClick={() => {
              setActiveTab("address");
              setSidebarOpen(false);
            }}
          >
            <Home size={18} className="md:w-5 md:h-5" /> Addresses
          </li>
          <li 
            onClick={() => {
              onSubmit();
              setSidebarOpen(false);
            }} 
            className="flex items-center text-sm md:text-[18px] hover:bg-red-100 p-2 rounded-lg gap-3 cursor-pointer hover:text-red-600 mt-6 md:mt-10 transition-colors"
          >
            <LogOut size={18} className="md:w-5 md:h-5" /> Logout
          </li>
        </ul>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto w-full">
        {activeTab === "profile" && (
          <div>
            {/* Profile Card */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 sm:p-6 mb-4 md:mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 md:mb-0">
                <h1 className="text-xl sm:text-2xl font-bold">Profile Details</h1>
                <button className="flex items-center gap-2 bg-orange-500 text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl hover:bg-orange-600 text-sm sm:text-base w-full sm:w-auto justify-center">
                  <Edit2 size={16} /> Edit
                </button>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <User className="text-gray-600 w-5 h-5 flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base break-words">{userInfo.name}</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Mail className="text-gray-600 w-5 h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base break-words">{userInfo.email}</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Phone className="text-gray-600 w-5 h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">{userInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <MapPin className="text-gray-600 w-5 h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base break-words">{userInfo.address}</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Calendar className="text-gray-600 w-5 h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">{userInfo.dob}</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <User className="text-gray-600 w-5 h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">{userInfo.gender}</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <CreditCard className="text-gray-600 w-5 h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base break-words">{userInfo.payment}</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <Utensils className="text-gray-600 w-5 h-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base break-words">{userInfo.cuisine}</span>
                </div>
              </div>
            </div>

            {/* Rewards */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl md:rounded-2xl p-4 sm:p-6 text-white mb-4 md:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold">🍔 Foodie Rewards</h2>
              <p className="mt-2 text-sm sm:text-base">
                You have <b>{userInfo.points} points</b>
              </p>
              <p className="mt-1 text-sm sm:text-base">
                Status: <b>{userInfo.membership}</b>
              </p>
              <button className="mt-3 bg-white text-orange-600 px-4 py-2 rounded-lg sm:rounded-xl hover:bg-gray-200 text-sm sm:text-base w-full sm:w-auto">
                Redeem Rewards
              </button>
            </div>

            {/* Offers Section */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 mb-4">
                <Gift className="text-orange-500 w-5 h-5 sm:w-6 sm:h-6" /> Available Offers
              </h2>
              <ul className="space-y-2 sm:space-y-3 text-gray-700">
                <li className="p-3 bg-gray-50 rounded-lg sm:rounded-xl border hover:shadow text-sm sm:text-base transition-shadow">
                  🎉 Get 20% OFF on your next order above ₹500
                </li>
                <li className="p-3 bg-gray-50 rounded-lg sm:rounded-xl border hover:shadow text-sm sm:text-base transition-shadow">
                  🚚 Free Delivery on orders above ₹199
                </li>
                <li className="p-3 bg-gray-50 rounded-lg sm:rounded-xl border hover:shadow text-sm sm:text-base transition-shadow">
                  💳 10% Cashback with HDFC Bank Cards
                </li>
              </ul>
            </div>
          </div>
        )}
        {activeTab === "orders" && (
          <div className="bg-gray-50 min-h-[70vh] p-4 sm:p-6 rounded-xl md:rounded-3xl shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 sm:mb-6 border-b-2 border-orange-400 pb-2">
              My Orders
            </h1>

            {orderList.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-12 sm:py-20">
                <p className="text-gray-500 text-base sm:text-lg mb-4">You haven't ordered anything yet 🍕</p>
                <img src="/assets/empty-orders.svg" alt="No orders" className="w-32 h-32 sm:w-48 sm:h-48 opacity-70" />
                <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-md transition-all text-sm sm:text-base">
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {orderList.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 border-l-4 border-orange-400 hover:shadow-lg transition-all w-full"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                      <h2 className="font-semibold text-lg sm:text-xl text-gray-800 break-words">
                        Order #{order._id.slice(0, 10).toUpperCase()}
                      </h2>
                      <span className="text-xs sm:text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <p className="text-gray-700 flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 text-sm sm:text-base">
                        <span className="flex items-center gap-2"><MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0" /> Address:</span>
                        <span className="break-words">{order.address}</span>
                      </p>
                      <p className="text-gray-700 flex items-center gap-2 text-sm sm:text-base">
                        <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0" /> Payment: {order.methodOfPayment.toUpperCase()}
                      </p>
                      <p className="text-gray-700 flex items-center gap-2 font-semibold text-sm sm:text-base">
                        <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 flex-shrink-0" /> Total: ₹{order.total}
                      </p>
                    </div>

                    <h3 className="font-medium text-gray-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
                      <Utensils className="text-orange-500 w-4 h-4 sm:w-5 sm:h-5" /> Items:
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm sm:text-base">
                      {order.foodItems.map((item) => (
                        <li key={item._id} className="flex justify-between items-center gap-2">
                          <span className="break-words">{item.name} × {item.quantity}</span>
                          <span className="font-semibold flex-shrink-0">₹{item.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "address" && (
          <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold mb-4">Saved Addresses</h1>

            {/* Show saved addresses */}
            {addressList.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {addressList.map((address) => (
                  <div
                    key={address._id}
                    className="border rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm bg-gray-50"
                  >
                    <h2 className="font-semibold text-base sm:text-lg mb-1">{address.title}</h2>
                    <p className="text-gray-700 text-sm sm:text-base break-words">{address.address}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-sm sm:text-base">No addresses saved yet 🏠</p>
            )}

            {/* Add Address Form */}
            {addingAddress && (
              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  placeholder="Title (e.g. Home, Office)"
                  value={addressTitle}
                  onChange={(e) => setAddressTitle(e.target.value)}
                  className="w-full border rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  placeholder="Address details"
                  value={addressDetail}
                  onChange={(e) => setAddressDetail(e.target.value)}
                  className="w-full border rounded-lg p-2 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <div className="flex flex-col sm:flex-row gap-2">
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
                    setAddressList(list.data.addressList || []);
                  }}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 text-sm sm:text-base transition-colors w-full sm:w-auto"
                >
                  Save Address
                </button>
                <button onClick={()=> setAddingAddress(false)} className="bg-gray-300 border-slate-300 border-2 font-heading text-slate-800 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 text-sm sm:text-base transition-colors w-full sm:w-auto">
                  Cancel
                </button>
                </div>
              </div>
            )}

            {/* Button to open form */}
            {!addingAddress && (
              <button
                onClick={() => setAddingAddress(true)}
                className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 text-sm sm:text-base w-full sm:w-auto transition-colors"
              >
                Add New Address
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
