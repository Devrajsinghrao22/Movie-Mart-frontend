import React, { useState } from "react";
import { debounce, size } from "lodash";
import { Form, Empty, AutoComplete, Spin, Skeleton } from "antd";
import Sidebar from "../Components/Header";
import Title from "antd/es/skeleton/Title";
import DetailMovieCard from "../Components/DetailMovieCard";
import SmallCards from "../Components/SmallCards";
import useRequireAuth from "../Components/useRequireAuth";


const Search = () => {
  useRequireAuth("/");

  const [options, setOptions] = useState([]);
  const [searchLoading, Setsearchloading] = useState(false);
  const [selectLoading, Setselectloading] = useState(false);
  const [movieDetails, Setmoviedetails] = useState(null);
    const [allplaylists, Setplaylists] = useState([]);

  const [form] = Form.useForm();

  const onSelect = (value, option) => {
    const { imdbID, Title, Year } = JSON.parse(value);
    console.log("value: ", imdbID);

    const fetchapi = async () => {
      Setselectloading(true);
        const result = await fetch(
          `http://www.omdbapi.com/?&apikey=9f963ea7&i=${imdbID}`
        );
        if (result.ok) {
          const data = await result.json();
          Setmoviedetails(data);
          Setselectloading(false);
          // const data = await result.json();
          // Setmoviedata(data.Search)
          console.log("data: ", data);
        } 
        // message.error(`error: ${err}`);
        Setselectloading(false);
    };
    fetchapi();

    // const location = localStorage.getItem("location");
    // let item_status;
    // const {
    //   item_id,
    //   name,
    //   price,
    //   description,
    //   image,
    //   type_for_item,
    //   // item_status,
    //   bud,
    //   pud,
    //   sgj,
    // } = JSON.parse(value);

    // if (location === "PIA") {
    //   if (pud === true) {
    //     item_status = "active";
    //   } else {
    //     item_status = "inactive";
    //   }
    // } else if (location === "BIA") {
    //   if (bud === true) {
    //     item_status = "active";
    //   } else {
    //     item_status = "inactive";
    //   }
    // } else if (location === "Sanand") {
    //   if (sgj === true) {
    //     item_status = "active";
    //   } else {
    //     item_status = "inactive";
    //   }
    // }

    form.setFieldsValue({
      search: `${Title} - ${Year}`,
    });
    // setOptions([]);
    // // setComponentDisabled(true);
  };

  const debouncedSearch = debounce(async (searchText) => {
    if (searchText) {
      Setsearchloading(true);

      try {
        const token = localStorage.getItem("tokenadmin");
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=9f963ea7&s=${searchText}`
        );
        const data = await response.json();
        const top10Results = data.Search ? data.Search.slice(0, 10) : [];
        console.log("top: ", top10Results);
        setOptions(top10Results);
        Setsearchloading(false);
      } catch (error) {
        console.error("Error searching:", error);
      }
      Setsearchloading(false);
    } else {
      setOptions([]);
      Setsearchloading(false);
    }
  }, 300);

  const handleSearch = (value) => {
    debouncedSearch(value);
  };

  const getNotFoundContent = () => {
    if (searchLoading) {
      return (
        <div className="flex justify-center items-center">
          <Spin size="small" />
        </div>
      );
    } else if (options.length === 0) {
      return <Empty description="No Data" />;
    } else {
      return null;
    }
  };

  return (
    <Sidebar>
      <Form
        id={"form"}
        form={form}
        layout="horizontal"
        //   disabled={componentDisabled}
        style={{
          maxWidth: 600,
          minWidth: 200,
        }}
        //   onFinish={async (values) => {
        //     try {
        //       const location1 = localStorage.getItem("location");
        //       const location = lowerCase(location1);
        //       const token = localStorage.getItem("tokenadmin");
        //       const {
        //         item_id,
        //         name,
        //         price,
        //         description,
        //         image,
        //         type_for_item,
        //         item_status,
        //       } = values;
        //       if(uploadedimage === null){
        //         message.error('Please upload an Image')
        //       }
        //       else{
        //       const response = await fetch(
        //         "http://localhost:5000/admin/additem",
        //         {
        //           method: "POST",
        //           headers: {
        //             "Content-Type": "application/json",
        //             Authorization: `Bearer ${token}`,
        //           },
        //           body: JSON.stringify({
        //             item_id,
        //             name,
        //             price,
        //             description,
        //             image: uploadedimage,
        //             type_for_item,
        //             item_status,
        //             location,
        //           }),
        //         }
        //       );
        //       if (response.ok) {
        //         const { message } = await response.json();
        //         notification.success({
        //           message: message,
        //           duration: 2,
        //         });

        //         form.resetFields();
        //         Setuploadedimage(null);
        //       } else {
        //         const errorData = await response.json();
        //         notification.error({
        //           message: errorData.message,
        //           description: "An error occurred during adding item",
        //           duration: 2,
        //         });
        //       }
        //     }
        //     } catch (error) {
        //       console.error("Error during adding item:", error);
        //       notification.error({
        //         message: "Error",
        //         description: "An error occurred during adding item",
        //         duration: 2,
        //       });
        //     }
        //   }}
      >
        <Form.Item label="Search" name="search" style={{ marginBottom: 0 }}>
          <AutoComplete
            placeholder="search here"
            onSearch={handleSearch}
            onSelect={onSelect}
            notFoundContent={getNotFoundContent()}
            options={options.map((option) => ({
              value: JSON.stringify(option),
              label: (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <img style={{ height: "30px" }} src={option.Poster} alt=" " />
                  <span>
                    {option.Title} - {option.Year}
                  </span>
                </div>
              ),
            }))}
          />
        </Form.Item>
      </Form>
      <div className="flex mt-5 justify-center items-center">
        {selectLoading ? (
          <div className=" w-full mx-auto bg-gray-200 shadow-custom rounded-lg overflow-hidden">
            <Skeleton className="p-4 py-7" paragraph={{ rows: 10 }} active />
          </div>
        ) : movieDetails ? (
          <DetailMovieCard movie={movieDetails} />
        ) : (
          <Empty className="mt-24" description="No movie selected" />
        )}
      </div>
    </Sidebar>
  );
};

export default Search;
