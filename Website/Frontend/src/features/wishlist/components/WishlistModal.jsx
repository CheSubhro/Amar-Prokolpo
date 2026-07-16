
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToWishlistThunk }  from "../../../features/wishlist/wishlistSlice";
import { Modal, Input, Button } from "../../../components/common"; 
import useSavedScheme from "../../../hooks/useSavedScheme";

const WishlistModal = ({ isOpen, onClose, schemeId }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSavedScheme();
    const [notes, setNotes] = useState("");
    const [reminderDate, setReminderDate] = useState("");

    const handleSave = async () => {

        if (!user) {
            navigate("/login");
            return;
        }
        try {
            const result = await dispatch(
                addToWishlistThunk({
                    schemeId,
                    notes,
                    reminderDate
                })
            );
            if (result.type.endsWith("/fulfilled")) {
                onClose();
            } else {
                console.error("Wishlist failed:", result);
            }
        } catch(error) {
            console.error("Error occurred:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title="Add to Wishlist"
            footer={
                <div style={{ display: "flex", gap: "10px" }}>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={onClose} variant="outline">Cancel</Button>
                </div>
            }
        >
            <div style={{ padding: "10px" }}>
                <label>Notes</label>
                <textarea 
                    value={notes} 
                    onChange={(e) => setNotes(e.target.value)} 
                    placeholder="Add your notes..."
                    style={{ width: "100%", padding: "8px", margin: "10px 0", borderRadius: "5px" }}
                />
                
                <label>Reminder Date</label>
                <Input 
                    type="date" 
                    value={reminderDate} 
                    onChange={(e) => setReminderDate(e.target.value)} 
                />
            </div>
        </Modal>
    );
};

export default WishlistModal;