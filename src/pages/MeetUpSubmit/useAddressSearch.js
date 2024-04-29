import { useState } from 'react';

export function useAddressSearch(elementWrap, setCafeAddress) {
  const [address, setAddress] = useState('');

  const handleAddressSearch = () => {
    if (!elementWrap.current) {
      console.error('ElementWrap is not defined.');
      return;
    }

    new window.daum.Postcode({
      oncomplete: function (data) {
        let fullAddress =
          data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
        setAddress(fullAddress);
        setCafeAddress(fullAddress);
        elementWrap.current.style.display = 'none';
      },
      width: '100%',
      height: '100%',
    }).embed(elementWrap.current);
    elementWrap.current.style.display = 'block';
  };

  return [address, setAddress, handleAddressSearch];
}
