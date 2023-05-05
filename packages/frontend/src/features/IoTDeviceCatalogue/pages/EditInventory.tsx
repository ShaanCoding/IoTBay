import { useNavigate, useParams } from "react-router-dom";
import CreateEditInventory, {
  FormValues,
} from "../components/CreateEditInventory";
import { useUpdateProduct, useGetProduct } from "../../../hooks/useProducts";
import { useToast } from "@chakra-ui/react";
import { ApiError, ProductsSchema } from "../../../api/generated";

export default function EditInventory() {
  const productId: string = useParams().id as string;
  const getProduct = useGetProduct(productId);
  const updateProduct = useUpdateProduct();

  const toast = useToast();
  const navigate = useNavigate();

  const updateProductFunction = async (data: ProductsSchema) => {
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
      if (error instanceof ApiError) {
        toast({
          title: "Inventory update failed",
          description: error.body?.message ?? "Unknown error",
          status: "error",
          duration: 5000,
          isClosable: true,
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
