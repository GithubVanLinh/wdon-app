import Image from "next/image";
import { ContentCard } from "..";

export function MediaAdd({ setSelectedImage }: any) {
  const handleFile = () => {
    console.log("handle file");
  };

  return (
    <ContentCard border>
      <div className="flex flex-row justify-between">
        <div className="flex-col">Add to your post</div>
        <div className="flex flex-row">
          <div className="flex justify-center items-center gap-2">
            {/* <Image src="/image.svg" alt="image" width={30} height={30} /> */}
            <label onChange={handleFile} htmlFor="formId">
              <input
                hidden
                multiple
                accept="image/*"
                id="formId"
                src="/image.svg"
                type="file"
                name="myImage"
                // Event handler to capture file selection and update the state
                onChange={(event) => {
                  if (
                    event?.target.files != null &&
                    event.target.files.length > 0
                  ) {
                    console.log(event.target.files); // Log the selected file
                    setSelectedImage(event.target.files);
                  } // Update the state with the selected file
                }}
              />
              <Image src="/image.svg" alt="image" width={30} height={30} />
            </label>
            <button onClick={() => window.alert("tag")}>
              <Image src="/tag.svg" alt="tag" width={30} height={30} />
            </button>
          </div>
        </div>
      </div>
    </ContentCard>
  );
}
