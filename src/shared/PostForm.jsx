import { Box, Button, Flex } from "rebass/styled-components";
import { Label, Input } from "@rebass/forms/styled-components";
import { useForm } from "react-hook-form";
import Loader from "react-loader-spinner";

export const PostForm = ({ defaultValues, onFormSubmit, isLoading }) => {
  const { register, handleSubmit } = useForm({ defaultValues });

  const onSubmit = handleSubmit((data) => {
    onFormSubmit(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ marginBottom: 3 }}>
        <Label htmlFor="title">Title</Label>
        <Input ref={register} id="title" name="title" type="text" />
      </Box>
      <Box sx={{ marginBottom: 3 }}>
        <Label htmlFor="content">Content</Label>
        <Input ref={register} id="content" name="content" type="text" />
      </Box>
      <Button variant="primary" mr={2}>
        {isLoading ? (
          <Loader type="ThreeDots" color="#fff" height={10} />
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
};

export const CommentForm = ({ defaultValues, onFormSubmit, isLoading }) => {
  const { register, handleSubmit, reset } = useForm({ defaultValues });

  const onSubmit = handleSubmit(async (data) => {
    await onFormSubmit(data);
    reset();
  });

  return (
    <form onSubmit={onSubmit}>
      <Flex width="100%" alignItems="flex-end">
        <Box flexGrow={1}>
          <Input
            ref={register}
            id="text"
            name="text"
            type="text"
            placeholder="Leave Comment"
          />
        </Box>
        <Button variant="primary" ml={4}>
          {isLoading ? (
            <Loader type="ThreeDots" color="#fff" height={10} />
          ) : (
            "Submit"
          )}
        </Button>
      </Flex>
    </form>
  );
};
