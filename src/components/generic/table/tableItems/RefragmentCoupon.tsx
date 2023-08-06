import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useRecoilValue } from "recoil";
import { arrayAtomFamily } from "../../../../atoms";
import FormModal, { FormModalRefType } from "../../../core/modals/FormModal";
import PrimaryButton from "../../../core/PrimaryButton";
import FragmentForm from "../FragmentForm";
import SelectDropdown from "../../SelectDropdown";

const RefragmentCoupon = forwardRef((props: any, ref) => {
  const fragments = useRecoilValue(arrayAtomFamily("allFragmentData"));
  //@ts-ignore
  const [selectedValue, setSelectedValue] = useState(
    fragments && fragments.length > 0 && fragments[0].value
  );

  const formModalRef = useRef<FormModalRefType>();
  const handleInputChange = (e: any) => {
    setSelectedValue(e.target.value);
  };

  useImperativeHandle(ref, () => ({
    getValue: () => selectedValue,
  }));

  return (
    <div className="example-header flex space-x-3">
      <SelectDropdown
        onChange={handleInputChange}
        label={""}
        options={fragments}
        id={"page-size"}
      />
      <PrimaryButton
        label={"Refragment"}
        onClick={async () => {
          formModalRef.current?.show();
        }}
      />
      <FormModal ref={formModalRef}>
        <FragmentForm
          data={props.data}
          selectedId={selectedValue}
          onClose={() => {
            formModalRef.current?.hide();
          }}
        />
      </FormModal>
    </div>
  );
});

export default RefragmentCoupon;
