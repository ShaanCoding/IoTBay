import { Button, ButtonProps } from "@chakra-ui/react";
import { trpcReact } from "../../../App";

interface DeleteUserButton extends ButtonProps {
    userId: string 
}

export default function DeleteUserButton ({userId, ...buttonProps}: DeleteUserButton) {
    const context = trpcReact.useContext()
    const deleteStaffMutation = trpcReact.staff.delete.useMutation({
        // this will grab some data and make it invalidated so that it refreshed the screen 
        onSuccess: () => {
            context.staff.staff.invalidate()
        }
    })

    return <Button {...buttonProps} onClick={() => {
        deleteStaffMutation.mutate(
            userId
        )
    }} loading={deleteStaffMutation.isLoading} />

}