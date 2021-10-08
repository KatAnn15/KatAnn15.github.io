import * as React from "react";
import ListGalleryItem from "./ListGalleryItem/ListGalleryItem";
import firebase from "../../Global/Firebase/firebase_setup";
const { useCallback, useEffect, useState } = React;
import "./ListGallery.scss";
import { getFirestoreData } from "src/scripts/Global/Firebase/firebase_actions";

interface ListGalleryProps {
  files: JSX.Element;
}

const ListGallery: React.FC = () => {
  const ref = firebase.firestore();
  const [files, setFiles] = useState<(ListGalleryProps["files"] | null)[]>([
    null,
  ]);

  const fetchListGalleryItems = useCallback(async () => {
    const files = await getFirestoreData("HomeListGallery");
    const allFiles: JSX.Element[] = files.map((file) => {
      const {
        title,
        subtitle,
        mediaURL,
        mediaAlt,
        additionalBox,
        videoCover,
        downloadGif,
        imageURL,
        name,
      } = file;
      return (
        <ListGalleryItem
          title={title}
          subtitle={subtitle}
          mediaURL={mediaURL}
          mediaAlt={mediaAlt}
          additionalBox={additionalBox}
          videoCover={videoCover}
          downloadGif={downloadGif}
          imageURL={imageURL}
          name={name}
          key={title}
        />
      );
    });
    setFiles(allFiles);
  }, [ref]);

  useEffect(() => {
    fetchListGalleryItems();
  }, [fetchListGalleryItems]);

  return <div className="list-gallery_wrapper">{files}</div>;
};

export default ListGallery;
