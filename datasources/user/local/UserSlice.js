import { createSlice } from "@reduxjs/toolkit";
import toast from "@/utils/notification/toast";
import { isEmpty } from "@/utils/general";
// import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  favorite: [],
  collection: [],
  product: [],
};

export function checkInFavorite(cart, id) {
  return cart.some((item) => item.id === id);
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      const has_product_in_favorite = state.favorite.some(
        (item) => item.id === action.payload.id
      );
      if (has_product_in_favorite) {
        const index = state.favorite.findIndex(
          (item) => item.id === action.payload.id
        );
        state.favorite.splice(index, 1);
        toast.info("محصول از لیست علاقه مندی های شما حذف شد.");
      } else {
        state.favorite.push({ ...action.payload, quantity: 1 });
        toast.success("با موفقیت به لیست علاقه مندی های شما اضافه شد!");
      }
    },
    addCollection: (state, action) => {
      const { collection_name } = action.payload;
      const nextLocalId = !isEmpty(state.collection)
        ? state.collection[state.collection.length - 1].localId + 1
        : 1;

      state.collection.push({
        localId: nextLocalId,
        name: collection_name,
        items: [],
      });
      toast.success(`مجموعه با موفقیت ایجاد شد!`);
    },
    addAccountProduct: (state, action) => {
      state.product = [action.payload.product, ...state.product];
    },
    removeAccountProduct: (state, action) => {
      const { id } = action.payload;
      const adaptedProduct = state.product.filter((item) => item.id !== id);
      state.product = adaptedProduct;
    },
    setAccountProductUploadUrl: (state, action) => {
      const { product, id } = action.payload;

      const adaptedProduct = state.product.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            ...product,
          };
        } else {
          return item;
        }
      });

      state.product = adaptedProduct;
      toast.success(`محصول با موفقیت ثبت شد!`);
    },
    setAccountProductLoading: (state, action) => {
      const { loading, id } = action.payload;

      const adaptedProduct = state.product.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            loading,
          };
        } else {
          return item;
        }
      });

      state.product = adaptedProduct;
    },
    setAccountProductUploadStatus: (state, action) => {
      const { status, id } = action.payload;

      const adaptedProduct = state.product.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: {
              success: status.success,
              retryCount: status.success
                ? 0
                : item.retryCount
                ? item.retryCount + 1
                : 1,
            },
          };
        } else {
          return item;
        }
      });

      state.product = adaptedProduct;
    },
    addOrRemoveFootageInCollection: (state, action) => {
      const { localId, footage_details, type } = action.payload;
      let collection_target = state.collection.find(
        (c) => c.localId === localId
      );
      switch (type) {
        case "add":
          collection_target.items.push({
            id: footage_details.id,
            title: footage_details.title,
            media: footage_details.media,
          });
          toast.success(`مجموعه با موفقیت ایجاد شد!`);
          break;
        case "remove":
          const index = collection_target.items.findIndex(
            (item) => item.id === footage_details.id
          );
          collection_target.items.splice(index, 1);
          toast.info(`با موفقیت حذف شد.`);
          break;
      }
    },
  },
  // extraReducers: {
  //     [HYDRATE]: (state, action) => {
  //         return {
  //             ...state,
  //             ...action.payload
  //         };
  //     }
  // }
});
// shortcut stats
export const favoriteItems = (state) => state.user.favorite;
export const collectionItems = (state) => state.user.collection;
export const uncompletedProductItems = (state) => state.user.product;
// Action creators are generated for each case reducer function
export const {
  addToFavorite,
  addCollection,
  addOrRemoveFootageInCollection,
  addAccountProduct,
  setAccountProductUploadUrl,
  setAccountProductLoading,
  setAccountProductUploadStatus,
  removeAccountProduct,
} = userSlice.actions;

export default userSlice.reducer;
