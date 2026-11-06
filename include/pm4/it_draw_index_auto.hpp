#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItDrawIndexAutoDef {
    static constexpr std::uint8_t opcode = 0x2d;
    static constexpr std::string_view name = "IT_DRAW_INDEX_AUTO";
    static constexpr std::string_view desc = "Non-indexed geometric primitive draw with automatic vertex indexing";
};
}
