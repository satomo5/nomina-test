export function badgeRoleStatus(status: string) {
  let statusBadge: { variant: "success" | "danger"; text: string } = {
    variant: "success",
    text: "Default",
  };

  switch (status) {
    case "active":
      statusBadge = {
        variant: "success",
        text: "Active",
      };

      break;

    case "inactive":
      statusBadge = {
        variant: "danger",
        text: "Inactive",
      };

      break;

    default:
      break;
  }

  return statusBadge;
}

export function badgeOrderStatus(status: string) {
  let statusBadge: { variant: "success" | "info" | "warning"; text: string } = {
    variant: "success",
    text: "Default",
  };

  switch (status) {
    case "pending":
      statusBadge = {
        variant: "warning",
        text: "Pending",
      };

      break;

    case "shipped":
      statusBadge = {
        variant: "info",
        text: "Shipped",
      };

      break;

    case "delivered":
      statusBadge = {
        variant: "success",
        text: "Delivered",
      };

      break;

    default:
      break;
  }

  return statusBadge;
}
