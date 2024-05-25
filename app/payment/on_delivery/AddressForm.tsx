import React, { useState } from "react";

interface Address {
  city: string;
  country: string;
  line1: string;
  line2?: string;
  postal_code: string;
  state: string;
}

interface AddressFormProps {
  onAddressSubmit: (address: Address) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onAddressSubmit }) => {
  const [address, setAddress] = useState<Address>({
    city: "",
    country: "",
    line1: "",
    line2: "",
    postal_code: "",
    state: "",
  });
  const [isEditing, setIsEditing] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddressSubmit(address);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          City:
        </label>
        <input
          type="text"
          name="city"
          value={address.city}
          onChange={handleChange}
          required
          readOnly={!isEditing}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Country:
        </label>
        <input
          type="text"
          name="country"
          value={address.country}
          onChange={handleChange}
          required
          readOnly={!isEditing}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Line 1:
        </label>
        <input
          type="text"
          name="line1"
          value={address.line1}
          onChange={handleChange}
          required
          readOnly={!isEditing}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Line 2:
        </label>
        <input
          type="text"
          name="line2"
          value={address.line2}
          onChange={handleChange}
          readOnly={!isEditing}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Postal Code:
        </label>
        <input
          type="text"
          name="postal_code"
          value={address.postal_code}
          onChange={handleChange}
          required
          readOnly={!isEditing}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          State:
        </label>
        <input
          type="text"
          name="state"
          value={address.state}
          onChange={handleChange}
          required
          readOnly={!isEditing}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {isEditing ? (
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save Address
        </button>
      ) : (
        <button
          type="button"
          onClick={handleEdit}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Edit
        </button>
      )}
    </form>
  );
};

export default AddressForm;
