import { useNavigate, useParams } from "react-router-dom";
import CreateEditInventory, {
  FormValues,
} from "../components/CreateEditInventory";
import { useUpdateProduct, useGetProduct } from "../../../hooks/useProducts";
import { useToast } from "@chakra-ui/react";
import { RouterInput } from "backend";
import { TRPCClientError } from "@trpc/client";
import { isTRPCClientError } from "../../../utils/trpc";

export default function EditInventory() {
  const productId: string = useParams().id as string;
  const getProduct = useGetProduct(productId);
  const updateProduct = useUpdateProduct();

  const toast = useToast();
  const navigate = useNavigate();

  const updateProductFunction = async (data: RouterInput["products"]["update"]) => {
    try {
      updateProduct.mutateAsync({
        productId: data.productId,
        name: data.name,
        price: data.price,
        image: data.image,
        description: data.description,
        stock: data.stock,
        category: data.category,
      });
      toast({
        title: "Inventory updated",
        description: "Record has been updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/staff/inventory");
    } catch (error) {
      if (isTRPCClientError(error)) {
        toast({
          title: "Inventory update failed",
          description: error.message,
          status: "error",
          duration: 5000,
        });
      } else {
        toast({
          title: "Inventory update failed",
          description: "Unknown error",
          status: "error",
          duration: 5000,
        });
      }
      
    }
  };

  if (getProduct.isLoading || !getProduct.data) {
    return <div>Loading...</div>;
  }

  const initialDefaultValues = {
    productId: getProduct.data.productId,
    name: getProduct.data.name,
    description: getProduct.data.description,
    price: getProduct.data.price,
    stock: getProduct.data.stock,
    category: getProduct.data.category,
    image: getProduct.data.image,
  } as FormValues;

  return (
    <CreateEditInventory
      createOrUpdate="edit"
      updateProduct={updateProductFunction}
      editId={productId}
      initialFormValues={initialDefaultValues}
    />
  );
}
