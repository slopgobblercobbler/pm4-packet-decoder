#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItSetShRegPairsPackedDef {
    static constexpr std::uint8_t opcode = 0x54;
    static constexpr std::string_view name = "IT_SET_SH_REG_PAIRS_PACKED";
    static constexpr std::string_view desc = "Write packed shader register pairs (two 16-bit registers per dword)";
};
}
