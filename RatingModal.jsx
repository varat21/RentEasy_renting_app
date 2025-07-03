// import { useState } from "react";
// import {
//   Modal,
//   Button,
//   Textarea,
//   Select,
//   Stack,
//   Title,
//   Center,
//   Box,
// } from "@mantine/core";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";

// const RatingModal = ({ open, setOpen, propertyId }) => {
//   const Navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [formData, setFormData] = useState({
//     rating: "5",
//     comment: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSelectChange = (value) => {
//     setFormData({ ...formData, rating: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!token) {
//       Navigate("/login");
//       return;
//     }

//     // if (!formData.rating || !formData.comment.trim()) {
//     //   toast.error("All fields are required!");
//     //   return;
//     // }

//     try {
//       // console.log("Token from localStorage:", localStorage.getItem("token"));

//       // Decode the token to get the user ID
//       const decodedToken = jwtDecode(token);
//       const userId = decodedToken?.userId; // Adjust based on your token structure
//       console.log(userId);

//       // Use FormData instance correctly
//       const requestData = new FormData();
//       requestData.append("propertyId", propertyId);
//       requestData.append("rating", formData.rating);
//       requestData.append("comment", formData.comment);
//       requestData.append("id", userId); // Fix: Use requestData.append, not formData.append

//       // console.log(requestData);

//       const response = await axios.post(
//         "http://localhost/rent-easy/public/insertRating.php",
//         requestData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(requestData)

//       if (response.data.success) {
//         toast.success("Review added successfully!");
//         setFormData({ rating: "", comment: "" });
//         setOpen(false);
//       } else {
//         toast.error(response.data.message || "Something went wrong");
//       }
//     } catch (error) {
//       console.error("Error submitting rating:", error);
//       toast.error("An error occurred while submitting the rating.");
//     }
//   };

//   return (
//     <Modal opened={open} onClose={() => setOpen(false)} size="lg" centered>
//       <Center>
//         <Box w={400}>
//           <Title order={3} align="center" mb="md">
//             Post Your Review
//           </Title>
//           <form onSubmit={handleSubmit}>
//             <Stack spacing="md">
//               <Textarea
//                 label="Review Description"
//                 placeholder="Describe your experience..."
//                 autosize
//                 minRows={4}
//                 // required
//                 name="comment"
//                 value={formData.comment}
//                 onChange={handleChange}
//               />
//               <Select
//                 label="Rating"
//                 placeholder="Select rating"
//                 data={[
//                   { value: "5", label: "⭐️⭐️⭐️⭐️⭐️ (5)" },
//                   { value: "4", label: "⭐️⭐️⭐️⭐️ (4)" },
//                   { value: "3", label: "⭐️⭐️⭐️ (3)" },
//                   { value: "2", label: "⭐️⭐️ (2)" },
//                   { value: "1", label: "⭐️ (1)" },
//                 ]}
//                 required
//                 value={formData.rating}
//                 onChange={handleSelectChange}
//               />
//               <Button type="submit" fullWidth>
//                 Submit Review
//               </Button>
//             </Stack>
//           </form>
//         </Box>
//       </Center>
//     </Modal>
//   );
// };

// export default RatingModal;



import { useState } from "react";
import {
  Modal,
  Button,
  Textarea,
  Select,
  Stack,
  Title,
  Center,
  Box,
} from "@mantine/core";
import { toast } from "react-hot-toast";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const RatingModal = ({ open, setOpen, propertyId }) => {
  const Navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    rating: "5",
    comment: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      Navigate("/login");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.userId; // Adjust based on your token structure

      const requestData = new FormData();
      requestData.append("propertyId", propertyId);
      requestData.append("rating", formData.rating);
      requestData.append("comment", formData.comment);
      requestData.append("id", userId);

      const response = await axios.post(
        "http://localhost/rent-easy/public/insertRating.php",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Review added successfully!");
        setFormData({ rating: "", comment: "" });
        setOpen(false);
        window.location.reload(); // Reload page after successful submission
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("An error occurred while submitting the rating.");
    }
  };

  return (
    <Modal opened={open} onClose={() => setOpen(false)} size="lg" centered>
      <Center>
        <Box w={400}>
          <Title order={3} align="center" mb="md">
            Post Your Review
          </Title>
          <form onSubmit={handleSubmit}>
            <Stack spacing="md">
              <Textarea
                label="Review Description"
                placeholder="Describe your experience..."
                autosize
                minRows={4}
                name="comment"
                value={formData.comment}
                onChange={handleChange}
              />
              <Select
                label="Rating"
                placeholder="Select rating"
                data={[
                  { value: "5", label: "⭐️⭐️⭐️⭐️⭐️ (5)" },
                  { value: "4", label: "⭐️⭐️⭐️⭐️ (4)" },
                  { value: "3", label: "⭐️⭐️⭐️ (3)" },
                  { value: "2", label: "⭐️⭐️ (2)" },
                  { value: "1", label: "⭐️ (1)" },
                ]}
                value={formData.rating}
                onChange={handleSelectChange}
              />
              <Button type="submit" fullWidth>
                Submit Review
              </Button>
            </Stack>
          </form>
        </Box>
      </Center>
    </Modal>
  );
};

export default RatingModal;