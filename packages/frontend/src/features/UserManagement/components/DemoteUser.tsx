import { Button, ButtonProps } from "@chakra-ui/react";
import { trpcReact } from "../../../App";

interface DemoteUserButton extends ButtonProps {
  userId: string;
}

export default function DemoteUserButton({
  userId,
  ...buttonProps
}: DemoteUserButton) {
  const context = trpcReact.useContext();
  const deactivateStaffMutation = trpcReact.staff.deactivate.useMutation({
    onSuccess: () => {
      context.users.users.invalidate();
    },
  });

  return (
    <Button
      {...buttonProps}
      onClick={() => {
        deactivateStaffMutation.mutate(userId);
      }}
      loading={deactivateStaffMutation.isLoading}
    />
  );
}
