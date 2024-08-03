import React, { useState } from "react";
import { View, Button, ScrollView, Text, TextInput,Alert,StyleSheet,Platform } from "react-native";
import { useWindowDimensions } from "react-native";
import pdfMake from "pdfmake/build/pdfmake";
import vfs_fonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
// console.log("pdfMake.vfs" + JSON.stringify(pdfMake.vfs));
// console.log("vfs" + JSON.stringify(vfs_fonts));


if (Platform.OS==='web'&&!pdfMake.vfs) {
  pdfMake.vfs = vfs_fonts?.pdfMake?.vfs;
}



export default function Index() {
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
    if(Platform.OS==='web'){
    
      const newRow = [
        { text: formData.id, style: "cell" },
        { text: formData.name, style: "cell" },
        { text: formData.product, style: "cell" },
        { text: formData.price, style: "cell" },
      ];
      setRows([...rows, newRow]);
      setFormData({ id: "", name: "", product: "", price: "" });
    }else if(Platform.OS==='android'){
      const newRow = `
      <tr class="row">
        <td class="id" style="border: 1px solid black; border-collapse: collapse; text-align: center; font-size: 16px; color: white; background-color:skyblue; font-weight: 700; padding: 5px; overflow-wrap:break-word; word-wrap:break-word;">${formData.id}</td>
        <td class="name" style="border: 1px solid black; border-collapse: collapse; text-align: center; font-size: 16px; color: white; background-color:skyblue; font-weight: 700; padding: 5px; overflow-wrap:break-word; word-wrap:break-word;">${formData.name}</td>
        <td class="product" style="border: 1px solid black; border-collapse: collapse; text-align: center; font-size: 16px; color: white; background-color:skyblue; font-weight: 700; padding: 5px; overflow-wrap:break-word; word-wrap:break-word;">${formData.product}</td>
        <td class="price" style="border: 1px solid black; border-collapse: collapse; text-align: center; font-size: 16px; color: white; background-color:skyblue; font-weight: 700; padding: 5px; overflow-wrap:break-word; word-wrap:break-word;">${formData.price}</td>
      </tr>`;
    setRows([...rows, newRow]);
    setFormData({ id: '', name: '', product: '', price: '' });
    }

  };
  const html = `
    <!DOCTYPE html>
    <html lang="en16
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
    <table style="width: 80%; border: 1px solid black; border-collapse: collapse;position:relative;left:10%;margin-bottom:100px;table-layout: fixed; ">
        <thead>
            <tr>
                <th style="border: 1px solid black; border-collapse: collapse; font-size: 16px; font-weight: 900; background-color:aquamarine; padding: 7px;word-wrap: break-word;overflow-wrap: break-word;">Sr no</th>
                <th style="border: 1px solid black; border-collapse: collapse; font-size: 16px; font-weight: 900; background-color:aquamarine; padding: 7px;word-wrap: break-word;overflow-wrap: break-word;">Name</th>
                <th style="border: 1px solid black; border-collapse: collapse; font-size: 16px; font-weight: 900; background-color:aquamarine; padding: 7px;word-wrap: break-word;overflow-wrap: break-word;">Product</th>
                <th style="border: 1px solid black; border-collapse: collapse; font-size: 16px; font-weight: 900; background-color:aquamarine; padding: 7px;word-wrap: break-word;overflow-wrap: break-word;">Price</th>
            </tr>
        </thead>
        <tbody id="table-body">
            <tr class="row">
                <td class="id" style="border: 1px solid black; border-collapse: collapse; text-align: center; font-size: 20px; color: white; background-color:skyblue; font-weight: 700; padding: 7px;word-wrap: break-word;overflow-wrap: break-word;">1</td>
                <td class="name" style="border: 1px solid black; border-collapse: collapse; text-align: center; font-size: 20px; color: white; background-color:skyblue; font-weight: 700; padding: 7px;word-wrap: break-word;overflow-wrap: break-word;">krish</td>
                <td class="product" style="border: 1px solid black; border-collapse: collapse; text-align: center; font-size: 20px; color: white; background-color:skyblue; font-weight: 700; padding: 7px;word-wrap: break-word;overflow-wrap: break-word;">smartphone</td>
                <td class="price" style="border: 1px solid black; border-collapse: collapse; text-align: center; font-size: 20px; color: white; background-color:skyblue; font-weight: 700; padding: 7px;word-wrap: break-word;overflow-wrap: break-word;">700000</td>
            </tr>
            
            ${rows.join('')}
        </tbody>
    </table>
    </body>
    </html>
  `;
  const generatePdf = async () => {
  
    const docDefinition: TDocumentDefinitions = {
      content: [
        {
      
          table: {
            headerRows: 1,
            widths: [120, 120, 120, 120],
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
          alignment: "center",
          noWrap:false,
          
        },
      },  compress: false,

    
    };
    if(Platform.OS==='web'){
    // Use the pdfMake API to download the PDF
    pdfMake.createPdf(docDefinition).download("table.pdf");
    }else if(Platform.OS==='android'){
      
      const file = await Print.printToFileAsync({
        html: html,
        base64: false
      });
      if (!file.uri) {
        throw new Error('File URI is undefined');
      }
  
      // Share the PDF file
      await shareAsync(file.uri);
    }
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
