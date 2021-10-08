export interface HeaderGlobalProps {
  logo: string;
  updateLogo: string;
}

export interface ModalVisibleProps {
  modalVisible: Boolean;
  setModalVisibility: React.Dispatch<React.SetStateAction<Boolean>>;
}

export interface MembersMoreToggle {
  areaExpanded: Boolean;
  setAreaExpanded: React.Dispatch<React.SetStateAction<Boolean>>;
}
