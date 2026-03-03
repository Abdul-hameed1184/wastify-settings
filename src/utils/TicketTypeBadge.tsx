export const TicketTypeBadge = ({ type }: { type: string }) => {
  const getBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "inquiry":
        return "bg-yellow-100 text-yellow-800";
      case "issue":
        return "bg-red-100 text-red-800";
    case "ticket":
        return "bg-primary text-white";
      case "complaint":
        return "bg-red-100 text-red-800";
      case "request":
        return "bg-blue-100 text-blue-800";
      case "feedback":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span className={`mx-2 px-2 py-1 rounded-full text-xs ${getBadgeColor(type)}`}>
      {type}
    </span>
  );
};