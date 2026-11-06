#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItDrawIndirectMultiDef {
    static constexpr std::uint8_t opcode = 0x2c;
    static constexpr std::string_view name = "IT_DRAW_INDIRECT_MULTI";
    static constexpr std::string_view desc = "Multi-draw non-indexed primitive dispatch with count buffer";
};
}
