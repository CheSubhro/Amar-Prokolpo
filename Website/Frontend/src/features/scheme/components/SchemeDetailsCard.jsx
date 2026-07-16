
import React, { useState } from "react";
import {
  Badge, Box, Button, Heading, Image, Link, Stack, Text, VStack, SimpleGrid,
} from "@chakra-ui/react";
import { Modal } from "../../../components/common"; 
import {
  IconCalendar, IconCategory, IconExternalLink, IconMail, IconPhone, 
  IconEye, IconHeart, IconHeartFilled,
} from "@tabler/icons-react";
import useSavedScheme from "../../../hooks/useSavedScheme";
import { useNavigate } from "react-router-dom";
import WishlistModal from "../../wishlist/components/WishlistModal";
import ReviewForm from "../../reviews/components/ReviewForm";

const SchemeDetailsCard = ({ scheme }) => {

	const navigate = useNavigate();
	const { toggleSave, isSchemeSaved, user  } = useSavedScheme();

	const [isWishlistOpen, setIsWishlistOpen] = useState(false);
	const [isReviewOpen, setIsReviewOpen] = useState(false);

	const openWishlist = () => setIsWishlistOpen(true);
	const closeWishlist = () => setIsWishlistOpen(false);

	const openReview = () => setIsReviewOpen(true);
	const closeReview = () => setIsReviewOpen(false);
	
	if (!scheme) return null;

	const saved = isSchemeSaved(scheme._id);

	const handleSave = async()=>{
        if(!user){
            navigate("/login");
            return;
        }
        await toggleSave(scheme._id);
    };

	const formatDate = (date) => {
		if (!date) return "Not Available";
		return new Date(date).toLocaleDateString("en-IN", {
		day: "numeric", month: "long", year: "numeric",
		});
	};

	const ListSection = ({ title, items }) => (
		<Box bg="white" p={6} borderRadius="xl" border="1px solid" borderColor="gray.200">
		<Heading size="md" mb={5}>{title}</Heading>
		{items?.length > 0 ? (
			<VStack align="stretch" gap={2}>
			{items.map((item, index) => (
				<Box key={index} display="flex" alignItems="flex-start">
				<Text color="blue.500" mr={2}>•</Text>
				<Text>{item}</Text>
				</Box>
			))}
			</VStack>
		) : (
			<Text color="gray.500">Not Available</Text>
		)}
		</Box>
	);

	return (
		<Stack spacing={8}>
		<Image
			src={scheme.image}
			alt={scheme.title}
			w="100%"
			h={{ base: "220px", md: "320px" }}
			objectFit="cover"
			borderRadius="2xl"
		/>

		<Box>
			<Stack direction="row" flexWrap="wrap" mb={4} spacing={3}>
			{scheme.category && <Badge colorScheme="blue" px={2} py={1} borderRadius="md">{scheme.category.name}</Badge>}
			{scheme.featured && <Badge colorScheme="yellow" px={2} py={1} borderRadius="md">Featured</Badge>}
			<Badge colorScheme={scheme.status === "ACTIVE" ? "green" : "red"} px={2} py={1} borderRadius="md">
				{scheme.status}
			</Badge>
			</Stack>
			<Heading mb={4} size="xl">{scheme.title}</Heading>
			<Text fontSize="lg" color="gray.600">{scheme.shortDescription}</Text>
		</Box>

		<SimpleGrid columns={{ base: 1, lg: 3 }} gap={8}>
			<VStack gridColumn={{ lg: "span 2" }} spacing={6} align="stretch">
			<Box>
				<Heading size="md" mb={4}>About this Scheme</Heading>
				<Text color="gray.700" lineHeight="1.8">{scheme.description}</Text>
			</Box>
			<ListSection title="Benefits" items={scheme.benefits} />
			<ListSection title="Eligibility" items={scheme.eligibility} />
			<ListSection title="Required Documents" items={scheme.requiredDocuments} />
			<ListSection title="Application Process" items={scheme.applicationProcess} />
			</VStack>

			<Box>
			<Box bg="white" borderRadius="xl" border="1px solid" borderColor="gray.200" p={6} position="sticky" top="90px">
				<Heading size="md" mb={6}>Scheme Information</Heading>
				<VStack align="stretch" spacing={5}>
				{[
					{ icon: IconCategory, label: "Category", val: scheme.category?.name },
					{ icon: IconCalendar, label: "Deadline", val: formatDate(scheme.deadline) },
					{ icon: IconPhone, label: "Helpline", val: scheme.helplineNumber },
					{ icon: IconMail, label: "Email", val: scheme.officialEmail },
					{ icon: IconEye, label: "Views", val: scheme.viewCount },
				].map((item, idx) => (
					<Stack key={idx} direction="row" align="center">
					<item.icon size={20} />
					<Text><b>{item.label}:</b> {item.val || "N/A"}</Text>
					</Stack>
				))}

				<Button
					colorScheme={saved ? "green" : "red"}
					variant={saved ? "solid" : "outline"}
					leftIcon={saved ? <IconHeartFilled size={18} /> : <IconHeart size={18} />}
					onClick={handleSave}
				>
					{saved ? "Saved" : "Save Scheme"}
				</Button>

				{scheme.applicationLink && (
					<Button as={Link} href={scheme.applicationLink} isExternal colorScheme="blue" size="lg" rightIcon={<IconExternalLink size={18} />}>
					Apply Now
					</Button>
				)}
				<Button
					mt={3}
					variant="solid"
					colorScheme="purple"
					onClick={openWishlist}
				>
					Add to Wishlist
				</Button>
				{user && (
					<Button
						mt={3}
						variant="solid"
						colorScheme="blue"
						onClick={openReview}
						w="full"
					>
						Add Your Review
					</Button>
				)}
				</VStack>
			</Box>
			</Box>
		</SimpleGrid>
		<WishlistModal
			isOpen={isWishlistOpen}
			onClose={closeWishlist}
			schemeId={scheme._id}
		/>
		<Modal
			isOpen={isReviewOpen}
			onClose={closeReview}
			title="Add Your Success Story"
		>
			<ReviewForm
				schemeId={scheme._id}
				onClose={closeReview}
			/>
		</Modal>
		</Stack>
		
	);
};

export default SchemeDetailsCard;