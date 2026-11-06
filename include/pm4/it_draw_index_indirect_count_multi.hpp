#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItDrawIndexIndirectCountMultiDef {
    static constexpr std::uint8_t opcode = 0x2f;
    static constexpr std::string_view name = "IT_DRAW_INDEX_INDIRECT_COUNT_MULTI";
    static constexpr std::string_view desc = "Multi-draw indexed with indirect count buffer dispatch";
};
}
