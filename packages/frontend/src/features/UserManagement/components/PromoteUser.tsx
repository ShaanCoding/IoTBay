import { Button, ButtonProps } from "@chakra-ui/react";
import { trpcReact } from "../../../App";

interface PromoteUserButton extends ButtonProps {
  userId: string;
}

export default function PromoteUserButton({
  userId,
  ...buttonProps
}: PromoteUserButton) {
  const context = trpcReact.useContext();
  const activateStaffMutation = trpcReact.staff.activate.useMutation({
    onSuccess: () => {
      context.users.users.invalidate();
    },
  });

  return (
    <Button
      {...buttonProps}
      onClick={() => {
        activateStaffMutation.mutate({
          userId: userId,
          position: "Generic Type",
        });
      }}
      loading={activateStaffMutation.isLoading}
    />
  );
}
