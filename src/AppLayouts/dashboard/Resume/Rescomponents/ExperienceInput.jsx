function ExperienceInput({ item, index, handleChange }) {
  return (
    <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
      <Input
        label="Job Title"
        name="title"
        placeholder="Frontend Developer"
        onChange={(event) => handleChange(index, event)}
        defaultValue={item?.title}
      />
      <Input
        label="Company Name"
        name="companyName"
        placeholder="Paps"
        onChange={(event) => handleChange(index, event)}
        defaultValue={item?.companyName}
      />
      <Input
        label="City"
        name="city"
        placeholder="Dakar"
        onChange={(event) => handleChange(index, event)}
        defaultValue={item?.city}
      />
      <Input
        label="State"
        name="state"
        placeholder="Senegal"
        onChange={(event) => handleChange(index, event)}
        defaultValue={item?.state}
      />
      <Input
        label="Start Date"
        name="startDate"
        type="date"
        onChange={(event) => handleChange(index, event)}
        defaultValue={item?.startDate}
      />
      <Input
        label="End Date"
        name="endDate"
        type="date"
        onChange={(event) => handleChange(index, event)}
        defaultValue={item?.endDate}
      />
    </div>
  );
}
