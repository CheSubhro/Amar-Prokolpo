
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import addToWishlist  from "../../../features/wishlist/wishlistSlice";
import { Modal, Input, Button } from "../../../components/common"; 

const WishlistModal = ({ isOpen, onClose, schemeId }) => {
    const dispatch = useDispatch();
    const [notes, setNotes] = useState("");
    const [reminderDate, setReminderDate] = useState("");

    const handleSave = () => {
        dispatch(addToWishlist({ schemeId, notes, reminderDate }));
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Modal title="Add to Wishlist" onClose={onClose}>
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

                <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={onClose} variant="outline">Cancel</Button>
                </div>
            </div>
        </Modal>
    );
};

export default WishlistModal;