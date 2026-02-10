import 'package:flutter/material.dart';

void main() => runApp(const SchoolPortalApp());

class SchoolPortalApp extends StatelessWidget {
  const SchoolPortalApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: const Color(0xFF8E54C1),
        scaffoldBackgroundColor: Colors.white,
      ),
      home: const MainNavigationFrame(),
    );
  }
}

class MainNavigationFrame extends StatefulWidget {
  const MainNavigationFrame({super.key});

  @override
  State<MainNavigationFrame> createState() => _MainNavigationFrameState();
}

class _MainNavigationFrameState extends State<MainNavigationFrame> {
  int _currentIndex = 0;

  final List<Widget> _mainScreens = [
    const ClassroomsScreen(),
    const DailyScheduleScreen(),
    const ProfileScreen(),
    const InboxScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: Padding(
          padding: const EdgeInsets.all(8.0),
          child: CircleAvatar(
            backgroundColor: Colors.blue.withOpacity(0.1),
            child: const Text("H", style: TextStyle(color: Colors.blue, fontSize: 12)),
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.account_circle_outlined, color: Color(0xFF5D4087), size: 28),
            onPressed: () {},
          )
        ],
      ),
      body: _mainScreens[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        backgroundColor: const Color(0xFF8E54C1),
        selectedItemColor: Colors.white,
        unselectedItemColor: Colors.white60,
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        showSelectedLabels: false,
        showUnselectedLabels: false,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: ''),
          BottomNavigationBarItem(icon: Icon(Icons.calendar_today), label: ''),
          BottomNavigationBarItem(icon: Icon(Icons.book), label: ''),
          BottomNavigationBarItem(icon: Icon(Icons.chat_bubble_outline), label: ''),
        ],
      ),
    );
  }
}

class ClassroomsScreen extends StatelessWidget {
  const ClassroomsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final classes = ["10th", "9th", "8th"];
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text("Classrooms", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFF8E54C1))),
          const SizedBox(height: 16),
          Container(
            margin: const EdgeInsets.only(bottom: 16),
            decoration: BoxDecoration(
              color: const Color(0xFFF3F0F7),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: const Color(0xFF8E54C1).withOpacity(0.2)),
            ),
            child: Material(
              color: Colors.transparent,
              child: InkWell(
                borderRadius: BorderRadius.circular(12),
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const AddMaterialScreen()),
                  );
                },
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 12),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: const [
                      Icon(Icons.upload_file, color: Color(0xFF8E54C1)),
                      SizedBox(width: 8),
                      Text("Upload Material", style: TextStyle(color: Color(0xFF8E54C1), fontWeight: FontWeight.bold)),
                    ],
                  ),
                ),
              ),
            ),
          ),
          ...classes.map((c) => GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => ClassDetailsScreen(className: c)),
              );
            },
            child: Container(
              margin: const EdgeInsets.only(bottom: 12),
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(colors: [Color(0xFF9B68D4), Color(0xFF814DBA)]),
                borderRadius: BorderRadius.circular(15),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(c, style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold)),
                      const Text("Text", style: TextStyle(color: Colors.white70)),
                    ],
                  ),
                  const Icon(Icons.arrow_forward_ios, color: Colors.white),
                ],
              ),
            ),
          )),
        ],
      ),
    );
  }
}

class ClassDetailsScreen extends StatelessWidget {
  final String className;

  const ClassDetailsScreen({super.key, required this.className});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text(className, style: const TextStyle(color: Colors.black)),
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, color: Colors.grey),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: 5,
        itemBuilder: (context, index) {
          return GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const StudentDetailsScreen()),
              );
            },
            child: Container(
              margin: const EdgeInsets.only(bottom: 12),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFFF3F0F7),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(
                children: [
                  CircleAvatar(backgroundColor: const Color(0xFF8E54B8).withOpacity(0.2), child: const Icon(Icons.person, color: Color(0xFF8E54B8))),
                  const SizedBox(width: 16),
                  Text("Student ${index + 1}", style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

class DailyScheduleScreen extends StatelessWidget {
  const DailyScheduleScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.grey.shade200),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: const EdgeInsets.all(16),
              decoration: const BoxDecoration(
                color: Color(0xFFF7F4F9),
                borderRadius: BorderRadius.only(topLeft: Radius.circular(12), topRight: Radius.circular(12)),
              ),
              child: Row(children: const [Text("10", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)), SizedBox(width: 20), Text("Today")]),
            ),
            _row("10 am", "English"),
            _row("11 am", "Maths"),
            _row("12 pm", "Science"),
            _row("1 pm", "Lunch"),
            _row("2 pm", "History"),
          ],
        ),
      ),
    );
  }

  Widget _row(String t, String s) => Padding(
    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 15),
    child: Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [Text(t), Text(s, style: const TextStyle(color: Colors.grey))]),
  );
}

class InboxScreen extends StatelessWidget {
  const InboxScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text("Inbox", style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFF8E54C1))),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.grey.shade200),
            ),
            child: Column(
              children: [
                Row(children: const [Icon(Icons.info_outline, color: Colors.grey, size: 20), SizedBox(width: 8), Text("Grading Pending", style: TextStyle(fontWeight: FontWeight.bold))]),
                const SizedBox(height: 15),
                Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: const [Text("Assignment", style: TextStyle(color: Colors.grey)), Text("Maths 101")]),
                const SizedBox(height: 8),
                Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: const [Text("Last Date", style: TextStyle(color: Colors.red)), Text("December 20", style: TextStyle(color: Colors.red))]),
                const Align(alignment: Alignment.centerRight, child: Padding(padding: EdgeInsets.only(top: 8), child: Text("View >", style: TextStyle(color: Colors.grey, fontSize: 12)))),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(vertical: 24),
            decoration: BoxDecoration(color: const Color(0xFFF3F0F7), borderRadius: BorderRadius.circular(12)),
            child: Column(
              children: const [
                CircleAvatar(radius: 30, backgroundColor: Color(0xFFDED5EC), child: Icon(Icons.person_outline, size: 35, color: Color(0xFF8E54C1))),
                SizedBox(height: 10),
                Text("Name", style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                Text("Position", style: TextStyle(color: Colors.grey, fontSize: 13)),
              ],
            ),
          ),
          const SizedBox(height: 12),
          _btn("CIRCULARS"),
          const SizedBox(height: 12),
          _btn("EVENTS"),
          const SizedBox(height: 12),
          _btn("ACCOUNT SETTINGS"),
          const Spacer(),
          Container(
            width: double.infinity,
            height: 50,
            decoration: BoxDecoration(border: Border.all(color: Colors.red.shade200), borderRadius: BorderRadius.circular(10)),
            child: const Center(child: Text("LOGOUT", style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold))),
          ),
        ],
      ),
    );
  }

  Widget _btn(String l) => Container(
    width: double.infinity,
    padding: const EdgeInsets.symmetric(vertical: 18),
    decoration: BoxDecoration(color: const Color(0xFFF3F0F7), borderRadius: BorderRadius.circular(10)),
    alignment: Alignment.center,
    child: Text(l, style: const TextStyle(color: Color(0xFF5D4087), fontSize: 12, fontWeight: FontWeight.w600)),
  );
}

class StudentDetailsScreen extends StatelessWidget {
  const StudentDetailsScreen({super.key});

  final Color brandPurple = const Color(0xFF8E54B8);
  final Color lightGreyBg = const Color(0xFFF3F0F7);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Color(0xFF4A4A4A)),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.account_circle_outlined, size: 30, color: Color(0xFF4A4A4A)),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Student Details",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: brandPurple),
            ),
            const SizedBox(height: 15),
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: lightGreyBg,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.black.withOpacity(0.1)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text("Name", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF4A4A4A))),
                      SizedBox(height: 4),
                      Text("Detail", style: TextStyle(color: Colors.grey)),
                      Text("Detail", style: TextStyle(color: Colors.grey)),
                    ],
                  ),
                  CircleAvatar(
                    radius: 45,
                    backgroundColor: brandPurple.withOpacity(0.1),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            _detailButton(context, "ATTENDANCE", () {}),
            _detailButton(context, "TEST PERFORMANCE", () {}),
            _detailButton(context, "FEE DETAILS", () {}),
          ],
        ),
      ),
    );
  }

  Widget _detailButton(BuildContext context, String text, VoidCallback onPress) {
    return GestureDetector(
      onTap: onPress,
      child: Container(
        width: double.infinity,
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.symmetric(vertical: 18),
        decoration: BoxDecoration(
          color: lightGreyBg,
          borderRadius: BorderRadius.circular(8),
        ),
        alignment: Alignment.center,
        child: Text(
          text,
          style: const TextStyle(fontWeight: FontWeight.w500, letterSpacing: 0.5, color: Color(0xFF4A4A4A)),
        ),
      ),
    );
  }
}

class AddMaterialScreen extends StatefulWidget {
  const AddMaterialScreen({super.key});

  @override
  State<AddMaterialScreen> createState() => _AddMaterialScreenState();
}

class _AddMaterialScreenState extends State<AddMaterialScreen> {
  // Common styles to maintain consistency
  final Color brandPurple = const Color(0xFF8E54B8);
  final Color fieldBg = const Color(0xFFF3F0F7);
  final Color labelGrey = const Color(0xFF616161);

  String? selectedClass;
  String? selectedSubject;
  String? selectedType;
  String? fileName;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios, color: Colors.grey, size: 20),
          onPressed: () => Navigator.pop(context),
        ),
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
            _buildDropdown("Select", ["10th", "9th", "8th"], selectedClass, (val) => setState(() => selectedClass = val)),
            
            _buildLabel("Subject"),
            _buildDropdown("Select", ["Maths", "Science", "English"], selectedSubject, (val) => setState(() => selectedSubject = val)),

            _buildLabel("Material Type"),
            _buildDropdown("Select", ["PDF", "Video", "Assignment"], selectedType, (val) => setState(() => selectedType = val)),

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
                onPressed: () {
                  if (selectedClass != null && selectedSubject != null && selectedType != null) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text("Material Published Successfully!")),
                    );
                    Navigator.pop(context);
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text("Please select all fields")),
                    );
                  }
                },
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

  Widget _buildDropdown(String hint, List<String> items, String? value, ValueChanged<String?> onChanged) {
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
          value: value,
          items: items.map((String item) {
            return DropdownMenuItem<String>(
              value: item,
              child: Text(item),
            );
          }).toList(),
          onChanged: onChanged,
        ),
      ),
    );
  }

  Widget _buildUploadButton() {
    return GestureDetector(
      onTap: () {
        setState(() {
          fileName = "document.pdf";
        });
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text("File 'document.pdf' selected")),
        );
      },
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(vertical: 12),
        decoration: BoxDecoration(
          color: fieldBg,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(fileName ?? "Upload ", style: TextStyle(color: fileName != null ? Colors.black : Colors.black26)),
            const Icon(Icons.file_upload_outlined, color: Colors.black26, size: 18),
          ],
        ),
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
