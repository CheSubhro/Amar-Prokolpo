
export const formatDate = (dateString, options = {}) => {
    if (!dateString) return "N/A";
  
    const date = new Date(dateString);
    
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      ...options,
    }).format(date);
  };
  
  export const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    return formatDate(dateString);
  };