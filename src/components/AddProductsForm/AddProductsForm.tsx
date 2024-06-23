import { useSubmitInventoryMutation } from "@/hooks/useSubmitInventoryMutation";
import { IInventoryItem, IProduct } from "@/services/InventoryService.type";
import { useEffect, useState } from "react";
import { Table } from "../Table/Table";
import { Field, Form, Formik, FormikConfig } from "formik";
import * as yup from "yup";
import { Button } from "../Button/Button";
import { Popup } from "../Popup/Popup";
import { CreateProductForm } from "../CreateProductForm/CreateProductForm";
import styles from "./AddProductsForm.module.scss";

type AddProductsFormProps = {
	productsList: IProduct[];
	inventoryList: IInventoryItem[];
	closePopup: () => void;
}


// below the table, there should be a submit button
export const AddProductsForm: React.FC<AddProductsFormProps> = ({
  productsList,
  inventoryList,
  closePopup,
}) => {
  const submitInventory = useSubmitInventoryMutation();

  const [productsToAdd, setProductsToAdd] = useState<IInventoryItem[]>(inventoryList ?? []);
  const [isProductPopupOpen, setIsProductPopupOpen] = useState(false);
	
  const openProductPopup = () => setIsProductPopupOpen(true);
  const closeProductPopup = () => setIsProductPopupOpen(false);

  const formikCongig: FormikConfig<{product: string, quantity: number}> = {
    initialValues: {
      product: "null",
      quantity: 0,
    },
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);
      if(productsToAdd.find((product) => product.name === values.product)) {
        setProductsToAdd(prev => {
          return prev.map((product) => {
            if(product.name === values.product) {
              return {
                ...product,
                quantity: product.quantity + values.quantity,
              };
            }
            return product;
          });
        });
      } else {
        setProductsToAdd(prev => [...prev, { name: values.product, quantity: values.quantity }]);
        formikHelpers.resetForm();
        formikHelpers.setSubmitting(false);
      }
    },
    validationSchema: yup.object().shape({
      product: yup.string().required("Product is required").notOneOf(["null"], "Product is required"),
      quantity: yup.number().required("Quantity is required").min(1, "Quantity should be more than 0").integer("Quantity should be an integer"),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false,
  };

  const handleSubmitInventory = () => {
    submitInventory.mutate(productsToAdd);
  };

  useEffect(() => {
    if(submitInventory.isSuccess) {
      setProductsToAdd([]);
      closePopup();
    }
  }, [submitInventory.isSuccess]);

  return (
    <div className={styles["container"]}>
      <Formik
        {...formikCongig}
      >
        {(props) => 
          <Form className={styles["inventory-form"]}>
            <h3>Add products to inventory</h3>
            <div className={styles["field"]}>
              <Field as="select" name="product" >
                <option value={"null"}>Select a product</option>
                {productsList.map((product) => (
                  <option key={product.name} value={product.name}>{product.name}</option>
                ))}
              </Field>
              {props.errors.product && <div className={styles["validation-error"]}>{props.errors.product}</div>}
            </div>
            <div className={styles["field"]}>
              <Field as="input" type="number" min="1" name="quantity" />
              {props.errors.quantity && <div className={styles["validation-error"]}>{props.errors.quantity}</div>}
            </div>
            <Button type="submit" disabled={submitInventory.isPending}>Add product</Button>
          </Form>
        }
      </Formik>
      <Button onClick={openProductPopup} disabled={submitInventory.isPending} className="mb-2 self-end">Add new product</Button>
      <Table
        columns={["Product", "Quantity", "Actions"]}
        rows={productsToAdd.map((product) => [product.name, product.quantity, "Remove"])}
        actions={[
          {
            index: 2,
            action: (name) => {
              setProductsToAdd(prev => {
                return prev.filter((product) => product.name !== name);});
            },
            actionPayloadIndex: 0,
          },
        ]}
        isSubmitting={submitInventory.isPending}
      />
      <Button
        onClick={handleSubmitInventory}
        disabled={submitInventory.isPending}
        className="self-end"
      >
				Submit
      </Button>
      {submitInventory.error && <div>{submitInventory.error.message}</div>}
      {isProductPopupOpen && (
        <Popup closePopup={closeProductPopup}>
          <CreateProductForm closePopup={closeProductPopup} />
        </Popup>
      )}
    </div>
  );
};