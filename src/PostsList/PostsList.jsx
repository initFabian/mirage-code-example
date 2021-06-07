import { Flex } from "rebass/styled-components";
import { Container } from "../shared";
import { useQuery } from "react-query";
import { getAllPosts } from "../api";
import { PostItem } from "./PostItem";
import Loader from "react-loader-spinner";
import _ from "lodash";

export const PostsList = () => {
  const { data, error, isLoading, isError } = useQuery("posts", getAllPosts);

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
    return <span>Error: {error.message}</span>;
  }

  return (
    <Container>
      <Flex flexDirection="column" alignItems="center">
        {data.map(({ content, title, id, commentIds }) => (
          <PostItem
            content={content}
            title={`${title} (${_.size(commentIds)} comments)`}
            key={id}
            id={id}
          />
        ))}
      </Flex>
    </Container>
  );
};
