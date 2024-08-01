import React, { useState } from "react";
import { View, Button, ScrollView, Text, TextInput } from "react-native";
import { useWindowDimensions } from "react-native";
import pdfMake from "pdfmake/build/pdfmake";
import vfs_fonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";

// console.log("pdfMake.vfs" + pdfMake.vfs);
// console.log("vfs" + vfs_fonts);

export default function Index() {
  const generateRows = () => {
    let rows = "";
    for (let i = 2; i <= 30; i++) {
      rows += `
        <tr class="row">
            <td class="id" style="border: 1px solid black; border-collapse: collapse; text-align: center; font-size: 20px; color: white; background-color:skyblue; font-weight: 700; padding: 5px;">${i}</td>
            <td class="name" style="border: 1px solid black; border-collapse: collapse; text-align: center; font-size: 20px; color: white; background-color:skyblue; font-weight: 700; padding: 5px;">krish</td>
            <td class="product" style="border: 1px solid black; border-collapse: collapse; text-align: center; font-size: 20px; color: white; background-color:skyblue; font-weight: 700; padding: 5px;">smartphone</td>
            <td class="price" style="border: 1px solid black; border-collapse: collapse; text-align: center; font-size: 20px; color: white; background-color:skyblue; font-weight: 700; padding: 5px;">700000</td>
        </tr>`;
    }
    return rows;
  };

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    product: "",
    price: "",
  });
  const [rows, setRows] = useState<any[]>([]);

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addRow = () => {
    const newRow = [
      { text: formData.id, style: "cell" },
      { text: formData.name, style: "cell" },
      { text: formData.product, style: "cell" },
      { text: formData.price, style: "cell" },
    ];
    setRows([...rows, newRow]);
    setFormData({ id: "", name: "", product: "", price: "" });
  };

  const generatePdf = () => {
    const docDefinition: TDocumentDefinitions = {
      content: [
        {
          table: {
            headerRows: 1,
            widths: ["auto", "*", "*", "*"],
            body: [
              [
                { text: "Sr no", style: "header" },
                { text: "Name", style: "header" },
                { text: "Product", style: "header" },
                { text: "Price", style: "header" },
              ],
              ...rows,
            ],
          },
        },
      ],
      styles: {
        header: {
          bold: true,
          fontSize: 12,
          alignment: "center",
          fillColor: "aquamarine",
        },
        cell: {
          margin: [5, 5, 5, 5],
          //          border: [false, false, false, false],
          alignment: "center",
        },
      },
    };

    pdfMake.createPdf(docDefinition).download("table.pdf");
  };

  const { width } = useWindowDimensions();

  return (
    <ScrollView>
      <View style={{ marginHorizontal: 40 }}>
        <Button title="Generate PDF" onPress={generatePdf} />
        <View style={{ flex: 1, margin: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Id :</Text>
          <TextInput
            placeholder="Enter an id"
            style={{ borderWidth: 1, padding: 5 }}
            onChangeText={(value) => handleInputChange("id", value)}
            value={formData.id}
          />
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Name :</Text>
          <TextInput
            placeholder="Enter a Name"
            style={{ borderWidth: 1, padding: 5 }}
            onChangeText={(value) => handleInputChange("name", value)}
            value={formData.name}
          />
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Product :</Text>
          <TextInput
            placeholder="Enter a Product"
            style={{ borderWidth: 1, padding: 5 }}
            onChangeText={(value) => handleInputChange("product", value)}
            value={formData.product}
          />
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Price :</Text>
          <TextInput
            placeholder="Enter a Price"
            style={{ borderWidth: 1, padding: 5 }}
            onChangeText={(value) => handleInputChange("price", value)}
            value={formData.price}
          />
        </View>
        <Button title="Add" onPress={addRow} />
      </View>
    </ScrollView>
  );
}
