import { PostForm, Container } from "../shared";
import { Box, Heading } from "rebass/styled-components";
import { createPost } from "../api";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";

export const CreatePost = () => {
  const history = useHistory();
  const { mutateAsync, isLoading } = useMutation(createPost);

  const onFormSubmit = async (data) => {
    await mutateAsync({ ...data });
    history.push("/");
  };
  return (
    <Container>
      <Box
        sx={{
          py: 3,
        }}
      >
        <Heading sx={{ marginBottom: 3 }}>Create New Post</Heading>
        <PostForm onFormSubmit={onFormSubmit} isLoading={isLoading} />
      </Box>
    </Container>
  );
};
