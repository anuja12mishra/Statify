import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import TaskCompletionChart from '../components/Profile/TaskCompletionChart';

function Profile() {
    const [user, setUser] = useState({
        username: 'aj',
        email: 'aj@gmail.com',
        joinDate: '2023-09-15T00:00:00.000Z',
        totalTasks: 5,
        completedTasks: 2,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get("http://localhost:1000/api/v1/user-profile", {
                    withCredentials: true,
                });

                setUser(res.data.user);
                setFormData({
                    name: res.data.user.username,
                    email: res.data.user.email,
                });
                setIsLoading(false);
            } catch (err) {
                console.log(err);
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put("http://localhost:1000/api/v1/update-profile", formData, {
                withCredentials: true,
            });
            setUser({
                ...user,
                name: formData.name,
            });
            setIsEditing(false);
        } catch (err) {
            console.log(err);
        }
    };

    const formatJoinDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="w-full min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <div className="flex-grow px-6 py-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h1>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Left Section - Profile and Account Information */}
                        <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-sm p-6">
                            <div className="flex flex-col items-center mb-6">
                                <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden mb-4">
                                    {user.profilePicture ? (
                                        <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500 text-3xl font-semibold">
                                            {user.username.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                                <p className="text-gray-500 mt-1">Member since {formatJoinDate(user.joinDate)}</p>
                                <div className='flex gap-2'>
                                    {!isEditing && ( 
                                        <button
                                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            Edit Profile
                                        </button>
                                    )}
                                    <Link
                                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                        to="/reset-pass"
                                    >
                                        Change Password
                                    </Link>
                                </div>

                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                {isEditing ? (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="pt-4 flex gap-3">
                                            <button
                                                type="submit"
                                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                            >
                                                Save Changes
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsEditing(false);
                                                    setFormData({
                                                        name: user.name,
                                                        email: user.email,
                                                    });
                                                }}
                                                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500">User Name</h4>
                                                <p className="mt-1">{user.username}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500">Email</h4>
                                                <p className="mt-1">{user.email}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-500">Language</h4>
                                                <p className="mt-1">English</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Section - Stats Only */}
                        <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-sm p-6">
                            <h4 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Your Stats</h4>
                            <div className="mb-8">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <TaskCompletionChart
                                        totalTasks={user.totalTasks}
                                        completedTasks={user.completedTasks}
                                    />
                                </div>
                            </div>

                            {/* <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-gray-50 rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-blue-500">{user.completedTasks}</div>
                                    <div className="text-sm text-gray-500 mt-1">Tasks Completed</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-orange-500">{user.totalTasks - user.completedTasks}</div>
                                    <div className="text-sm text-gray-500 mt-1">Tasks Pending</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-green-500">{user.tasksThisMonth}</div>
                                    <div className="text-sm text-gray-500 mt-1">Tasks This Month</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-purple-500">{user.streak}</div>
                                    <div className="text-sm text-gray-500 mt-1">Day Streak</div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Profile;