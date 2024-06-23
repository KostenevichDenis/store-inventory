import { Field, Form, Formik, FormikConfig } from "formik";
import * as yup from "yup";
import { useEffect } from "react";

import styles from "./CreateProductForm.module.scss";
import { Button } from "../Button/Button";
import { useCreateProductMutation } from "@/hooks/useCreateProductMutation";
import { SubmitError } from "../SubmitError/SubmitError";

type CreateProductFormProps = {
	closePopup?: () => void;
};

export const CreateProductForm: React.FC<CreateProductFormProps> = ({ closePopup }) => {
  const createProductMutation = useCreateProductMutation();

  const formikCongig: FormikConfig<{name: string}> = {
    initialValues: {
      name: "",
    },
    onSubmit: async (values, formikHelpers) => {
      createProductMutation.mutate(values);
      formikHelpers.setSubmitting(true);
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Product name is required"),
		
    }),
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false,
  };

  useEffect(() => {
    if(createProductMutation.isSuccess && closePopup) {
      closePopup();
    }
  }, [createProductMutation.isSuccess]);
	
  return (
    <div className={styles["container"]}>
      <Formik
        {...formikCongig}
      >
        {(props) => 
          <Form className={styles["add-product-form"]}>
            <h4>CreateProductForm</h4>
            <Field as="input" type="text" name="name" placeholder="Enter product name" />
            {props.errors.name && <div>{props.errors.name}</div>}
            <Button type="submit" disabled={createProductMutation.isPending}>Create Product</Button>
            <SubmitError>{createProductMutation.error?.message}</SubmitError>
          </Form>
        }
      </Formik>
    </div>
  );
};