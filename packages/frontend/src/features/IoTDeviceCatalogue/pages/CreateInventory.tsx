import CreateEditInventory from "../components/CreateEditInventory";
import { useCreateProduct } from "../../../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { RouterInput } from "backend";
import { isTRPCClientError } from "../../../utils/trpc";

export default function CreateInventory() {
  const createProduct = useCreateProduct();

  const toast = useToast();
  const navigate = useNavigate();

  const createProductFunction = async (
    data: RouterInput["products"]["create"]
  ) => {
    try {
      createProduct.mutateAsync({
        name: data.name,
        price: data.price,
        image: data.image,
        description: data.description,
        stock: data.stock,
        category: data.category,
      });
      toast({
        title: "Inventory created",
        description: "Record has been created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/staff/inventory");
    } catch (error) {
      if (isTRPCClientError(error)) {
        toast({
          title: "Inventory creation failed",
          description: error.message,
          status: "error",
          duration: 5000,
        });
      } else {
        toast({
          title: "Inventory creation failed",
          description: "Unknown error",
          status: "error",
          duration: 5000,
        });
      }
    }
  };

  return (
    <CreateEditInventory
      createOrUpdate="create"
      createProduct={createProductFunction}
    />
  );
}
