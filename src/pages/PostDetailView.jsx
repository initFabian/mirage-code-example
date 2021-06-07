import { CommentForm, Container } from "../shared";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Box, Heading, Flex, Text, Button } from "rebass/styled-components";
import { createComment, getPost } from "../api";
import { Link, useParams } from "react-router-dom";
import Loader from "react-loader-spinner";

export const PostDetailView = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data, error, isLoading, isError } = useQuery(["posts", id], getPost);
  const { mutateAsync: newCommentMutate, isLoading: isCommentLoading } =
    useMutation(createComment);

  const onCommentSubmit = async (data) => {
    await newCommentMutate({
      postId: id,
      comment: data,
    });
    queryClient.invalidateQueries(["posts", id]);
  };

  if (isLoading) {
    return (
      <Container>
        <Flex py="5" justifyContent="center">
          <Loader type="ThreeDots" color="#cccccc" height={30} />;
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
        }}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Flex flexDirection="column">
            <Text>Title:</Text>
            <Heading>{data.title}</Heading>
          </Flex>
          <Link to={`/post/${id}/update`}>
            <Button variant="outline" color="secondary">
              Edit
            </Button>
          </Link>
        </Flex>
        <Flex flexDirection="column" mt={10} mb={10}>
          <Text>Content:</Text>
          <Text>{data.content}</Text>
        </Flex>
        <Heading fontSize={[1, 2]} mb={2}>
          Comments
        </Heading>
        {data.comments?.map((c, idx) => (
          <Box key={idx} mb={2}>
            {c.text} -{" "}
            {`${new Date(c.createdAt).toLocaleDateString()} ${new Date(
              c.createdAt
            ).toLocaleTimeString()}`}
          </Box>
        ))}
        <Box mt={200}>
          <CommentForm
            defaultValues={data}
            onFormSubmit={onCommentSubmit}
            isLoading={isCommentLoading}
          />
        </Box>
      </Box>
    </Container>
  );
};
