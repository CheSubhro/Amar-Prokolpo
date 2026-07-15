
import { useWishlist } from "../hooks/useWishlist";
import { Card, Spinner, EmptyState } from "../components/common"; 

const WishlistPage = () => {
    
    const { wishlist, loading, error } = useWishlist();

    if (loading) return <Spinner />;
    if (error) return <p>Error: {error}</p>;
    if (wishlist.length === 0) return <EmptyState message="No items in wishlist" />;

    return (
        <div className="wishlist-container">
            <h1>My Wishlist</h1>
            {wishlist.map((item) => (
                <Card key={item._id}>
                    <h3>{item.schemeId.title}</h3>
                    <p>Notes: {item.notes}</p>
                    <p>Reminder: {new Date(item.reminderDate).toDateString()}</p>
                </Card>
            ))}
        </div>
    );
};

export default WishlistPage;