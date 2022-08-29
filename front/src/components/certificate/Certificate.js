import React, { useState } from "react";
import CertificateCard from "./CertificateCard";
import CertificateEditForm from "./CertificateEditForm";

function Certificate({
  certificate,
  setCertificates,
  isEditable,
  onShowButtonClickEventHandler,
  setDeleteCertificationId,
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <CertificateEditForm
          currentCertificate={certificate}
          setCertificates={setCertificates}
          setIsEditing={setIsEditing}
        />
      ) : (
        <CertificateCard
          certificate={certificate}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
          onShowButtonClickEventHandler={onShowButtonClickEventHandler}
          setDeleteCertificationId={setDeleteCertificationId}
        />
      )}
    </>
  );
}

export default Certificate;
