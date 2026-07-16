
import React, { useState, useEffect } from "react";
import { Box, Button, Input, Textarea, VStack, Heading, Field, Select, createListCollection } from "@chakra-ui/react";
import { toast } from "sonner"; 
import { useSupport } from "../../../hooks/useSupport";
import { validateSupportForm } from "../../../utils/validation";

const priorityCollection = createListCollection({
    items: [
        { label: "Low", value: "Low" },
        { label: "Medium", value: "Medium" },
        { label: "High", value: "High" },
    ],
});

const SupportForm = () => {

    const { loading, success, error, submitTicket, resetForm } = useSupport();
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        subject: "",
        message: "",
        priority: "Low"
    });

    useEffect(() => {
        if (success) {
            toast.success("Ticket submitted successfully! We will contact you soon.");
            setFormData({ name: "", email: "", phoneNumber: "", subject: "", message: "", priority: "Low" });
        }
        if (error) {
            toast.error(error);
        }
    }, [success, error]);

    useEffect(() => {
        return () => resetForm();
    }, [resetForm]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validation = validateSupportForm(formData);
        if (!validation.isValid) {
            toast.error(validation.message);
            return; 
        }
        submitTicket(formData);
    };

    return (
        <Box p={6} borderWidth="1px" borderRadius="lg" shadow="md" maxW="600px" mx="auto" mt={10} bg="white">
            <Heading size="md" mb={6} textAlign="center">Help & Support</Heading>
            
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <Field.Root required>
                        <Field.Label>Name</Field.Label>
                        <Input name="name" value={formData.name} onChange={handleChange} />
                    </Field.Root>

                    <Field.Root required>
                        <Field.Label>Email</Field.Label>
                        <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>Phone Number</Field.Label>
                        <Input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    </Field.Root>

                    <Field.Root required>
                        <Field.Label>Subject</Field.Label>
                        <Input name="subject" value={formData.subject} onChange={handleChange} />
                    </Field.Root>

                    <Field.Root required>
                        <Field.Label>Message</Field.Label>
                        <Textarea name="message" value={formData.message} onChange={handleChange} />
                    </Field.Root>

                    <Field.Root>
                        <Field.Label>Priority</Field.Label>
                        <Select.Root 
                            collection={priorityCollection} 
                            name="priority" 
                            value={[formData.priority]} 
                            onValueChange={(details) => setFormData({...formData, priority: details.value[0]})}
                        >
                           <Select.Trigger>
                              <Select.ValueText placeholder="Select priority" />
                           </Select.Trigger>
                           <Select.Content>
                              {priorityCollection.items.map((item) => (
                                 <Select.Item item={item} key={item.value}>
                                    {item.label}
                                 </Select.Item>
                              ))}
                           </Select.Content>
                        </Select.Root>
                    </Field.Root>

                    <Button 
                        type="submit" 
                        colorScheme="blue" 
                        width="full" 
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit Ticket"}
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default SupportForm;