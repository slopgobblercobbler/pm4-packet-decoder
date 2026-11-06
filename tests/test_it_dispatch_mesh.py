import json
import os
import unittest

class TestItDispatchMesh(unittest.TestCase):
    def setUp(self):
        p = os.path.join(os.path.dirname(__file__), '..', 'src', 'pm4_it_dispatch_mesh_indirect.json')
        with open(p, 'r') as f:
            self.data = json.load(f)

    def test_dispatch_mesh(self):
        self.assertEqual(self.data['opcode_id'], "0x4C")
        self.assertTrue(self.data['pipeline_type_mesh'])

if __name__ == '__main__':
    unittest.main()
