// import React from "react";
// import { Modal, Button } from "@mantine/core";

// const FilterModal = ({ isOpen, onClose, filteredProperties }) => {
//   return (
//     <Modal
//       opened={isOpen}
//       onClose={onClose}
//       title="Filtered Properties"
//       size="lg"
//       overlayProps={{ blur: 3 }}
//     >
//       <div className="space-y-4">
//         {filteredProperties.length === 0 ? (
//           <p>No properties found matching your filters.</p>
//         ) : (
//           filteredProperties.map((property) => (
//             <div key={property.propertyId} className="border p-4 rounded-lg">
//               <h3 className="font-semibold text-lg">{property.title}</h3>
//               <p className="text-gray-600">{property.description}</p>
//               <p className="text-sm text-gray-500">
//                 {property.city}, {property.country}
//               </p>
//             </div>
//           ))
//         )}
//       </div>
//     </Modal>
//   );
// };

// export default FilterModal;