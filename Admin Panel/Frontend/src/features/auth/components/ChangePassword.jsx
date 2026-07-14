
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../authSlice";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ChangePassword = () => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.newPassword !== form.confirmPassword) {
            toast.error("New password and confirm password do not match");
            return;
        }

        dispatch(changePassword({ 
            oldPassword: form.oldPassword, 
            newPassword: form.newPassword 
        }))
            .unwrap()
            .then(() => {
                toast.success("Password changed successfully");
                setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
            })
            .catch((err) => {
                toast.error(err || "Failed to change password");
            });
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="password"
                            name="oldPassword"
                            placeholder="Current Password"
                            value={form.oldPassword}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            value={form.newPassword}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm New Password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <Button 
                            type="submit" 
                            className="w-full" 
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "Change Password"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ChangePassword;