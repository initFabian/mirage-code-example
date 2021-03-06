import { PostForm, Container } from "../shared";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Box, Heading, Flex } from "rebass/styled-components";
import { getPost, updatePost } from "../api";
import { useParams, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";

export const UpdatePost = () => {
  const { id } = useParams();
  const history = useHistory();
  const queryClient = useQueryClient();

  const { data, error, isLoading, isError } = useQuery(["posts", id], getPost);
  const { mutateAsync, isLoading: isMutating } = useMutation(updatePost);

  const onFormSubmit = async (data) => {
    await mutateAsync({ ...data, id });
    queryClient.invalidateQueries(["posts", id]);
    history.push("/");
  };

  if (isLoading) {
    return (
      <Container>
        <Flex py="5" justifyContent="center">
          <Loader type="ThreeDots" color="#cccccc" height={30} />
        </Flex>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Flex py="5" justifyContent="center">
          Error: {error.message}
        </Flex>
      </Container>
    );
  }

  return (
    <Container>
      <Box
        sx={{
          py: 3,
          px: 3,
        }}
      >
        <Heading sx={{ marginBottom: 3 }}>Update Post</Heading>
        <PostForm
          defaultValues={data}
          onFormSubmit={onFormSubmit}
          isLoading={isMutating}
        />
      </Box>
    </Container>
  );
};
