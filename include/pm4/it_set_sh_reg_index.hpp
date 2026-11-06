#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItSetShRegIndexDef {
    static constexpr std::uint8_t opcode = 0x9b;
    static constexpr std::string_view name = "IT_SET_SH_REG_INDEX";
    static constexpr std::string_view desc = "Set shader register with indexed offset resolution";
};
}
