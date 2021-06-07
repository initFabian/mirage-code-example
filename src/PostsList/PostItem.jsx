import {
  Flex,
  Text,
  Button,
  Link as StyledLink,
  Heading,
} from "rebass/styled-components";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { removePost } from "../api";
import Loader from "react-loader-spinner";

export const PostItem = ({ id, title, content }) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(removePost);

  const remove = async () => {
    await mutateAsync(id);
    queryClient.invalidateQueries("posts");
  };

  return (
    <Flex key={id} p={3} width="100%">
      <Flex flexDirection="column" flexGrow={2}>
        <Flex alignItems="center" justifyContent="space-between">
          <Heading fontSize={[2, 3, 4]}>
            <Link component={StyledLink} to={`/update-post/${id}`} mr="auto">
              {title}
            </Link>
          </Heading>
          <Button onClick={remove} ml="5">
            {isLoading ? (
              <Loader type="ThreeDots" color="#fff" height={10} />
            ) : (
              "Remove"
            )}
          </Button>
        </Flex>
        <Text color="grey" maxWidth="50%" mt="8px">
          {content}
        </Text>
      </Flex>
    </Flex>
  );
};
