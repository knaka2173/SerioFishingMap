import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Image,
  Stack,
} from "@chakra-ui/react";

type CustomCardProps = {
  title: string;
  description: string;
  imageObjectUrl: string; // Blob URL を渡す
  footer?: React.ReactNode;
};

export const CustomCard = ({
  title,
  description,
  imageObjectUrl,
  footer,
}: CustomCardProps) => {
  return (
    <Card
      maxW="sm"
      boxShadow="md"
      _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
      transition="all 0.2s"
    >
      <CardHeader>
        <Image src={imageObjectUrl} alt={title} borderRadius="md" />
      </CardHeader>
      <CardBody>
        <Stack spacing="3">
          <Heading size="md">{title}</Heading>
          <Text color="gray.600">{description}</Text>
        </Stack>
      </CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};
