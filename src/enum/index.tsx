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
