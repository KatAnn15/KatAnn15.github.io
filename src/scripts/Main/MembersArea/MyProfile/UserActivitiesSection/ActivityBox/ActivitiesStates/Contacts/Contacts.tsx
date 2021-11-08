import * as React from "react";
import { ContactsTypes } from "./Contacts.d";
import "./Contacts.scss";

const Contacts: React.FC<ContactsTypes> = ({ data }) => {
  return (
    <div className="contacts-wrapper">
      <h3 className="contacts_title">
        <i className="fas fa-id-card-alt"></i> Contacts
      </h3>
    </div>
  );
};

export default Contacts;
