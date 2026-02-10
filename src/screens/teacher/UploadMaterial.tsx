import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(fontFamily: 'sans-serif'),
      home: const AddMaterialScreen(),
    );
  }
}

class AddMaterialScreen extends StatelessWidget {
  const AddMaterialScreen({super.key});

  // Common styles to maintain consistency
  final Color brandPurple = const Color(0xFF8E54B8);
  final Color fieldBg = const Color(0xFFF3F0F7);
  final Color labelGrey = const Color(0xFF616161);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: const Icon(Icons.arrow_back_ios, color: Colors.grey, size: 20),
        title: Row(
          children: [
            Icon(Icons.gesture, color: Colors.cyan[200]),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.account_circle_outlined, color: Colors.black54, size: 30),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Add New Study Material',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: brandPurple),
            ),
            const SizedBox(height: 25),

            // Form Fields
            _buildLabel("Class"),
            _buildDropdown("Select"),
            
            _buildLabel("Subject"),
            _buildDropdown("Select"),

            _buildLabel("Material Type"),
            _buildDropdown("Select"),

            _buildLabel("File"),
            _buildUploadButton(),

            _buildLabel("Material Title"),
            _buildTextField("Input Title"),

            const SizedBox(height: 40),
            
            // Publish Button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: brandPurple,
                  padding: const EdgeInsets.symmetric(vertical: 15),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                ),
                onPressed: () {},
                child: const Text('PUBLISH', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
              ),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        backgroundColor: brandPurple,
        selectedItemColor: Colors.white,
        unselectedItemColor: Colors.white70,
        showSelectedLabels: false,
        showUnselectedLabels: false,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: ''),
          BottomNavigationBarItem(icon: Icon(Icons.calendar_today_outlined), label: ''),
          BottomNavigationBarItem(icon: Icon(Icons.book), label: ''),
          BottomNavigationBarItem(icon: Icon(Icons.chat_bubble_outline), label: ''),
        ],
      ),
    );
  }

  Widget _buildLabel(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0, top: 12.0),
      child: Text(text, style: TextStyle(color: labelGrey, fontSize: 14, fontWeight: FontWeight.w500)),
    );
  }

  Widget _buildDropdown(String hint) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12),
      decoration: BoxDecoration(
        color: fieldBg,
        borderRadius: BorderRadius.circular(8),
      ),
      child: DropdownButtonHideUnderline(
        child: DropdownButton<String>(
          isExpanded: true,
          hint: Text(hint, style: const TextStyle(color: Colors.black26)),
          icon: const Icon(Icons.keyboard_arrow_down, color: Colors.grey),
          items: const [],
          onChanged: (val) {},
        ),
      ),
    );
  }

  Widget _buildUploadButton() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 12),
      decoration: BoxDecoration(
        color: fieldBg,
        borderRadius: BorderRadius.circular(8),
      ),
      child: const Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text("Upload ", style: TextStyle(color: Colors.black26)),
          Icon(Icons.file_upload_outlined, color: Colors.black26, size: 18),
        ],
      ),
    );
  }

  Widget _buildTextField(String hint) {
    return TextField(
      decoration: InputDecoration(
        hintText: hint,
        hintStyle: const TextStyle(color: Colors.black26),
        filled: true,
        fillColor: Colors.white,
        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 15),
        enabledBorder: OutlineInputBorder(
          borderSide: const BorderSide(color: Colors.black12),
          borderRadius: BorderRadius.circular(8),
        ),
      ),
    );
  }
}