import json
import os
import unittest

class TestPm4DispatchMeshDirect(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_it_dispatch_mesh_direct.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_packet_spec(self):
        self.assertEqual(self.data['opcode'], 0x2E)
        self.assertEqual(self.data['name'], 'IT_DISPATCH_MESH_DIRECT')

if __name__ == '__main__':
    unittest.main()
