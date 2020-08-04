import React, { useState } from "react";
import { Button, HelperText, TextInput } from "react-native-paper";

const Form = ({ handleSubmit }) => {
  const [item, setItem] = useState("");
  const [uploading, setUploading] = useState(false);

  const onChangeText = (item) => setItem(item);

  const hasErrors = () => {
    return !item.trim() || 0 === item.length;
  };

  const cb = () => {
    setUploading(false);
  };

  submitForm = () => {
    if (!hasErrors()) {
      setUploading(true);
      handleSubmit(item, cb);
      setItem("");
    }
  };

  return (
    <>
      <TextInput
        mode="outlined"
        label="Todo Item"
        value={item}
        onChangeText={onChangeText}
        style={{ height: 55 }}
      />
      <HelperText type="error" visible={hasErrors()}>
        Enter an item please!
      </HelperText>
      <Button
        style={{ marginTop: 10, padding: 8 }}
        icon="upload"
        mode="outlined"
        loading={uploading}
        onPress={submitForm}
      >
        Add The Item
      </Button>
    </>
  );
};

export default Form;
