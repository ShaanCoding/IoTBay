import CreateEditInventory from "../components/CreateEditInventory";
import { useCreateProduct } from "../../../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { ApiError, ProductsSchema } from "../../../api/generated";

export default function CreateInventory() {
  const createProduct = useCreateProduct();

  const toast = useToast();
  const navigate = useNavigate();

  const createProductFunction = async (data: ProductsSchema) => {
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
      if (error instanceof ApiError) {
        toast({
          title: "Inventory creation failed",
          description: error.body?.message ?? "Unknown error",
          status: "error",
          duration: 5000,
          isClosable: true,
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
